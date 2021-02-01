const server = require('express').Router();
const { Product, Category, Review, User } = require('../db.js');
const { isAdmin } = require('../middlewares/auth');


const {
  getAll,
  createOne,
  getOne,
  editOne,
  deleteOne
} = require('../controllers/products');
const { isUser } = require('../middlewares/auth.js');
// const { is } = require('sequelize/types/lib/operators');

// ------- Product Route -------
server.route('/').get((req, res) => {

  const { search } = req.query;

  getAll(search)
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
}).post((req, res) => {
  const {
    name,
    description,
    price,
    stock,
    images
  } = req.body;
  createOne(name, description, price, stock, images)
    .then(product => res.status(201).json(product))
    .catch(err => res.status(400).json(err));
});

server.get('/category', (req, res, next) => {

  Category.findAll({
    order: [
      ['id', 'ASC']
    ]
  })
    .then((categories) => {

      return res.send([...categories]);
    })
    .catch(next);
});

server.route('/:id').get((req, res) => {
  const { id } = req.params;

  getOne(id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ err, status: 404 }));
});

// ------- Update Product Route -------
server.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, stock, images } = req.body;

  Product.update({
    name,
    description,
    price,
    stock,
    images
  }, {
    where: { id }
  })
    .then(data => {
      if (!data) {
        return res.status(400).send({ error: 'Product Not Found' });
      }


      return Product.findByPk(id, { include: [Category] });
    })
    .then(product => {
      return res.send(product);
    })
    .catch(next);
});

// ------- Delete Product Route -------
server.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Product.destroy({
    where: { id }
  })
    .then((data) => {
      if (data) return res.send({ productDeleted: Number(id) });
      return res.status(404).send({ error: "Product not Found." });
    })
    .catch(next);
});

// ------- Add Product to Category Route -------

server.post('/:idProducto/category/:idCategoria', (req, res) => {
  const idProducto = req.params.idProducto;
  const idCategoria = req.params.idCategoria;

  var product;
  Product.findByPk(idProducto)
    .then((data) => {
      product = data;
      return Category.findByPk(idCategoria);
    })
    .then(async (category) => {
      await product.addCategories(category);

      // TODO: Ta feo cambiar!
      Product.findByPk(idProducto, { include: [Category] }).then(data => {
        res.send({ ...data.dataValues });
      });
    })
    .catch(err => {
      res.send(err);
    });
});

// ------- Delete Category from Product Route -------

server.delete('/:idProducto/category/:idCategoria', (req, res) => {
  const idProducto = req.params.idProducto;
  const idCategoria = req.params.idCategoria;

  var product;
  Product.findByPk(idProducto)
    .then((data) => {
      product = data;
      return Category.findByPk(idCategoria);
    })
    .then(async (category) => {
      await product.removeCategories(category);

      Product.findByPk(idProducto, { include: [Category] }).then(data => {
        res.send({ ...data.dataValues });
      });
    })
    .catch(err => {
      res.send(err);
    });
});

// ------- Add Category Route -------
server.post('/category', (req, res, next) => {
  const { name, description } = req.body;

  Category.create({
    name: name,
    description: description
  })
    .then((category) => {
      res.send({ ...category.dataValues });
    })
    .catch(next);
});

// ------- Delete Category Route -------
server.delete('/category/:id', (req, res) => {
  const { id } = req.params;
  Category.destroy({
    where: { id }
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({ error: 'Error: Category Not Found.' });
      } else {
        res.send({ deletedId: id });
      }
    })
    .catch(err => {
      res.send('Error:', err);
    });
});

// ------- Update Category Route -------
server.put('/category/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Category.update({
    name,
    description
  }, {
    where: { id }
  })
    .then(async (data) => {
      if (!data[0]) {
        res.status(404).send({ error: "Error: Category Not Found." });
      } else {

        const category = await Category.findByPk(id);

        return res.send({ ...category.dataValues });
      }
    })
    .catch(next);
});

// ------- Products X Category Route -------
server.get("/category/:categoryName", (req, res, next) => {
  const { categoryName } = req.params;

  Product.findAll({
    include: {
      model: Category,
      where: {
        name: categoryName
      }
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

// -----------GET All Reviews Route -----------
server.get("/:id/review", async (req, res, next) => {
  const { id } = req.params;

  try {

    const reviews = await Review.findAll({
      where: {
        productId: id
      },
      include: [User]
    });

    res.send(reviews);
  } catch (err) {
    next(err);
  }
});

//-----------Post Product Review Route -----------
server.post('/:id/review', isUser, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { stars, title, description } = req.body;

  Product.findOne({
    where: {
      id
    }
  }).then(product => {
    if (!product) {
      return res.status(404).send({ error: `Product not found` });
    } else {

      Review.create({
        stars,
        title,
        description,
        productId: id,
        userId: req.user.id
      })
        .then(r => {
          Review.findByPk(r.id, {
            include: [User]
          })
            .then((review) => {
              res.send(review);
            });
        })
        .catch(next);
    }
  });
});

//-----------Get Product Review Route -----------
server.get('/:id/review', (req, res, next) => {
  //devuelve las reviews del producto
  const { id } = req.params;

  Review.findAll({ //busca las reviews
    where: { productId: id } //<-- del producto especifico
  }).then((review) => {
    return res.send(review); //devuelve las reviews
  }).catch(next);
});

//-----------Delete Product Review Route -----------
server.delete('/:id/review/:idReview', (req, res) => {
  //elimina review
  const { idReview } = req.params;
  const userId = req.user.id;

  if (req.user.isAdmin) {
    Review.destroy({
      where: {
        id: idReview
      }
    })
      .then((data) => {
        if (data) return res.send({ reviewDeleted: Number(idReview) });
        return res.status(404).send({ Error: 'Review not found.' });
      });

  } else {
    Review.destroy({
      where: {
        id: idReview,
        userId
      }
    })
      .then((data) => {
        if (data) return res.send({ reviewDeleted: Number(idReview) });
        return res.status(403).send({ Error: "You can't delete that review." });
      });
  }
});

module.exports = server;
