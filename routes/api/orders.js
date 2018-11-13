const express = require('express');

const router = express.Router();

/* GET all orders */
router.get('/', (_req, res) => {
  res.send('All orders');
});

/* GET one order */
router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  res.send(`Order #${orderId}`);
});

module.exports = router;
