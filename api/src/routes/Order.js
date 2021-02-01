const server = require('express').Router();
const { Order, User, Product, OrderLine } = require('../db.js');

//-------------Get All Orders
server.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: User, attributes: ['email']
    }]
  })
    .then(order => {
      return res.send(order);
    }).catch(err => {
      res.send(err);
    });
});

//-------------Status Order
server.get('/status/:status', (req, res, next) => {
  //Esta ruta puede recibir el query string "status" y deberá devolver sólo las ordenes con ese status.
  //vamos a adivinar
  const status = req.params.status; //query string status
  Order.findAll({ //busca todas las ordenes
    where: {
      status //que tengan este argumento especifico (un estado)
    }
  }).then((orders) => {
    return res.send(orders); //devuelve esas ordenes
  }).catch(next);
});

//-------------Update Order
server.put('/:id/:status', (req, res, next) => {
  const { id, status } = req.params;

  Order.update({
    status
  },
    { where: { id } }
  )
    .then(() => {
      Order.findAll({
        include: [{
          model: User, attributes: ['email']
        }]
      })
        .then(order => {
          return res.send(order);
        }).catch(err => {
          res.send(err);
        });
    })
    .catch(next);
});

//-------------Get Order

server.get('/:id', (req, res) => {

  const { id } = req.params;

  Order.findByPk(id, {
    include: [{
      model: OrderLine,
      attributes: ['quantity', 'price'],
      include: [{
        model: Product,
        attributes: ['id', 'name', 'images']
      }]
    }]
  })
    .then((order) => {
      console.log(order);
      if (order)
        return res.send(order);
      else
        return res.status(404).send({ msg: "Order not found." });
    }).catch((err) => {
      console.log(err);

      return res.send(err);
    });
});


module.exports = server;
