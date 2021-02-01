const { Router } = require('express');
// import all routers;
const router = Router();
const productRouter = require('./product');
const usersRouter = require('./users');
const orderRouter = require('./Order');
const authRouter = require('./auth');
const orderlineRouter = require('./orderline');
const emailRouter = require('../controllers/email');
const mercadopago = require('./mercadopago');

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', usersRouter);
router.use('/orders', orderRouter);
router.use('/auth', authRouter);
router.use('/orderlines', orderlineRouter);
router.use('/email', emailRouter);
router.use('/mercadopago', mercadopago);

module.exports = router;
