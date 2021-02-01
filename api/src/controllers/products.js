const { Product, Category, Review } = require('../db');
const { Sequelize } = require('sequelize');

// Este método se encargará de obtener todos los productos
const getAll = (search) => {
  return new Promise((resolve, reject) => {

    let condition = {};
    if (search) {
      condition = {
        [Sequelize.Op.or]: [{
          name: {
            [Sequelize.Op.iLike]: "%" + search + "%"
          },

        }, {
          description: {
            [Sequelize.Op.iLike]: "%" + search + "%"
          }
        }
        ]
      };
    }

    Product.findAll({
      where: condition,
      include: [{
        model: Category,
        attributes: ['id', 'name', 'description']
      }, {
        model: Review
      }],
      order: [
        ['id', 'ASC']
      ]
    })
      .then((products) => {

        resolve(products);
      })
      .catch((err) => reject({ error: err }));
  });
};


// Crea un producto recibiendo como parámetros: nombre, descripción, precio, stock e imagenes
const createOne = (name, description, price, stock, images) => {
  return new Promise((resolve, reject) => {

    Product.create(
      { name, description, price, stock, images })
      .then(async product => {

        const newProduct = await Product.findByPk(product.id,
          {
            include: [{
              model: Category,
            }],
          }
        );

        resolve(newProduct);
      })
      .catch(err => reject({ error: err }));
  });
};

// Obtiene un único producto por su id
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    Product.findOne({
      where: { id },
      include: [Category, Review]
    })
      .then(product => {
        if (!product) {
          return reject({
            error: {
              name: 'ApiFindError',
              type: 'Products Error',
              errors: [
                {
                  message: 'product does not exist in the database',
                  type: 'not found',
                  value: null,
                },
              ],
            },
          });
        }
        resolve(product);
      })
      .catch(err => reject({ error: err }));
  });
};

// Dado el Id de un producto, lo encuentra y lo modifica
const editOne = (id, name, description, price, stock, imageUrl) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((product) => {

        if (name) product.name = name.toLowerCase();
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;

        return product.save();
      })
      .then((product) => resolve(product))
      .catch((err) => reject({ error: err }));
  });
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then(product => {
        product.destroy();

        resolve({ description: 'successfully remove object' });
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  getAll,
  createOne,
  getOne,
  editOne,
  deleteOne
};