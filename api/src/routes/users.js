const server = require('express').Router();
const { User, Order, OrderLine, Product, Category } = require('../db');
const { isUser, isAdmin } = require('../middlewares/auth');


// User creation route
server.post("/", async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// User update route
server.put("/:id", isUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.update(req.body, { where: { id }, returning: true });
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
});

// All users route
server.get("/", isAdmin, async (req, res, next) => {
  try {
    //si no esta logueado como admin no puede hacer un get de todos los usuarios      
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// User delete route
server.delete('/:id', isAdmin, (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: { id }
  })
    .then(() => {
      return res.send({ UserDeleted: `id: ${Number(id)}` });

    })
    .catch(next);
});

//----------------Post Cart User(REVISAR URGENTEMENTE!)
server.post('/:userId/cart', isUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { cart } = req.body;
    const order = await Order.findOrCreate({
      where: {
        userId,
        status: 'on_cart',
      }
    });
    const { id } = order[0].dataValues;

    cart.map(async p => {
      const orderLine = await OrderLine.findOne({
        where: {
          productId: p.id,
          orderId: id
        }

      });
      if (orderLine) await orderLine.update({
        quantity: orderLine.quantity + p.quantity
      });
      else await OrderLine.create({
        quantity: p.quantity,
        price: p.price,
        productId: p.id,
        orderId: order[0].dataValues.id
      });
    });

    const userCart = await OrderLine.findAll({
      where: {
        orderId: order[0].dataValues.id
      },
      include: [
        Order,
        {
          model: Product,
          include: [
            Category
          ]
        }
      ]
    });
    return res.send(userCart);
  } catch (error) {
    next(error);
  }
});

//----------------Get user cart.
server.get('/:userId/cart', isUser, (req, res, next) => {
  const { userId } = req.params;

  Order.findOne({
    where: {
      userId,
      status: 'on_cart'
    }
  })
    .then((order) => {
      if (!order) {
        return res.status(404).send({ error: `User doesn't have an order` });
      } else
        OrderLine.findAll({
          where: { orderId: order.id },
          include: [
            Order,
            {
              model: Product,
              include: [
                Category
              ]
            }
          ]
        })
          .then((orderLines) => {
            console.log(orderLines);
            return res.send(orderLines);
          });
    })
    .catch(next);
});

//-----------------Delete user cart.
server.delete('/:userId/cart', isUser, (req, res, next) => {
  const { userId } = req.params;

  Order.destroy({
    where: { userId }
  })
    .then((data) => {
      return res.send({ CartDeleted: `User ID: ${Number(userId)}` });

    })
    .catch(next);
});
//-------------Update or delete product from cart.
server.put('/:id/cart', isUser, async (req, res, next) => {
  const { id } = req.params;
  const { quantity, productId } = req.body;

  try {
    const order = await Order.findOrCreate({
      where: {
        userId: id,
        status: on_cart
      }
    });
    if (quantity < 1) {
      await OrderLine.destroy({
        where: {
          productId,
          orderId: order.dataValues.id
        }
      });
      return res.send("Order deleted ");
    } else {
      await OrderLine.update(
        { quantity },
        {
          where: {
            productId,
            orderId: order.id
          }
        });
      const orderLine3 = await OrderLine.findOne({
        where: {
          productId: productId,
          orderId: order.id
        }
      });

      return res.send(orderLine3);
    }
  }
  catch (e) {
    next(e);
  }
});

//-------------Get User Order
server.get('/:id/orders',  /* isUser, */(req, res, next) => {
  //devuelve las ordenes de usuarios
  const { id } = req.params;

  Order.findAll({ //busca las ordenes
    where: { userId: id }, //<-- del usuario especifico
    include: [{
      model: OrderLine,
      include: [{
        model: Product
      }],
    }]

  }).then((orders) => {
    console.log(orders);
    return res.send(orders); //devuelve las ordenes
  }).catch(next);
});

//--------------Password Reset Route
server.post('/passwordReset', isUser, async (req, res, next) => {
  const { id } = req.user;
  const newPassword = req.body.password;
  try {
    await User.update({
      password: newPassword,
      changePassword: false,
    }, { where: { id } });
    // await user.update({
    //   password: newPassword,
    //   changePassword: false,
    // });
    const userUpdated = await User.findByPk(id);
    res.send(userUpdated);
  } catch (error) {
    next(error);
  }
});

//-------------- Force Password Reset
server.put('/forcePasswordReset/:id', isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    user.update({
      changePassword: true,
    }); res.send('ok');
  } catch (error) {
    next(error);
  }
});

module.exports = server;