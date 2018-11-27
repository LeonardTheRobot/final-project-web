const express = require('express');

const robotRouter = require('./robot');
const ordersRouter = require('./orders');
const itemsRouter = require('./items');
const usersRouter = require('./users');

const router = express.Router();

router.use('/robot', robotRouter);
router.use('/orders', ordersRouter);
router.use('/items', itemsRouter);
router.use('/users', usersRouter);

/* GET API base */
router.get('/', (_req, res) => {
  res.send('CoffeeBot API');
});

module.exports = router;
