const server = require('express').Router();
const { isUser } = require('../middlewares/auth');
const { Order, OrderLine, Product, Category } = require('../db.js');

// POST orderLine

server.post('/', isUser, async (req, res) => {

  const { productId, quantity, price, orderId } = req.body;

  try {

    const order = await Order.findByPk(orderId);

    if (order) {
      let orderline = await OrderLine.findOne({
        where: {
          productId,
          orderId
        }
      });

      if (orderline) {
        await OrderLine.update({ quantity: orderline.quantity + quantity }, {
          where: {
            id: orderline.id
          }
        });

      } else {
        await OrderLine.create({ productId, quantity, price, orderId });
      }

      const response = await OrderLine.findAll({
        where: {
          orderId
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

      res.send(response);

    } else {
      res.status(400).send("Error: Bad Request");
    }
  } catch (err) {
    console.log(err);
  }

});

///---------ADD ITEM ///PUT

server.put('/', async (req, res, next) => {
  try {

    const { userId, quantity, productId, price } = req.body;
    const order = await Order.findOrCreate({
      where: {
        userId,
        status: 'on_cart',
      }
    });
    const { id } = order[0].dataValues;

    const orderLine = await OrderLine.findOne({
      where: {
        productId: productId,
        orderId: id
      }

    });
    if (orderLine) await orderLine.update({
      quantity: orderLine.quantity + quantity
    });
    else await OrderLine.create({
      quantity,
      price,
      productId,
      orderId: order[0].dataValues.id,
      price
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

//------ INCREMENT QUANTITY
server.put('/increment/:id', async (req, res, next) => {
  try {

    const { id } = req.params;

    const orderLine = await OrderLine.findOne({
      where: {
        productId: id
      }

    });
    await orderLine.update({
      quantity: orderLine.quantity + 1
    });

    const userCart = await OrderLine.findAll({
      where: {
        orderId: orderLine.orderId//order[0].dataValues.id
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

//------ DECREMENT QUANTITY
server.put('/decrement/:id', async (req, res, next) => {
  try {

    const { id } = req.params;

    const orderLine = await OrderLine.findOne({
      where: {
        productId: id,
      }

    });
    await orderLine.update({
      quantity: orderLine.quantity - 1
    });

    const userCart = await OrderLine.findAll({
      where: {
        orderId: orderLine.orderId//order[0].dataValues.id
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

//-----------REMOVE ITEM FROM CART
server.delete('/remove/:id', async (req, res, next) => {
  try {

    const { id } = req.params;

    const orderLine = await OrderLine.findOne({
      where: {
        productId: id,
      }

    })
    const orderId = orderLine.orderId

    await OrderLine.destroy({
      where: {
        productId: id,
      }

    })
    const userCart = await OrderLine.findAll({
      where: {
        orderId: orderId//order[0].dataValues.id
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

//--------CLEAR CART
server.delete('/empty/:id', async (req, res, next) => {
  try {

    const { id } = req.params;

    const orderLine = await OrderLine.findOne({
      where: {
        orderId: id,
      }

    })

    await OrderLine.destroy({
      where: {
        orderId: id,
      }

    })
    const userCart = [];
    return res.send(userCart);
  } catch (error) {
    next(error);
  }
});




module.exports = server;
