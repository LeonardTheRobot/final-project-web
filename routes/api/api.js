const express = require('express');

const robotRouter = require('./robot');
const ordersRouter = require('./orders');

const router = express.Router();

router.use('/robot', robotRouter);
router.use('/orders', ordersRouter);

/* GET API base */
router.get('/', (_req, res) => {
  res.send('CoffeeBot API');
});

module.exports = router;
