const express = require('express');

const router = express.Router();
const ordersRouter = require('./orders');

router.use('/orders', ordersRouter);

/* GET API base */
router.get('/', (_req, res) => {
  res.send('CoffeeBot API');
});

module.exports = router;
