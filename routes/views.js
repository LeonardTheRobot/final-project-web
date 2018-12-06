const express = require('express');

const router = express.Router();

/* GET system status page */
router.get('/', (_req, res) => {
  res.render('systemStatus');
});

router.get('/order', (_req, res) => {
  res.render('placeOrder');
});

router.get('/order/view', (_req, res) => {
  res.render('allOrders');
});

router.get('/order/view/:orderId', (req, res) => {
  res.render('order', { orderId: req.params.orderId });
});

module.exports = router;
