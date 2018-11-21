const express = require('express');

const Order = require('../../models/order');

const router = express.Router();

/* GET all orders */
router.get('/', async (_req, res, next) => {
  try {
    const data = await Order.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/* POST create an order */
router.post('/', async (req, res, next) => {
  try {
    const order = new Order({
      user: req.body.user,
      zone: req.body.zone,
      items: req.body.items,
    });
    const data = await order.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400).json(err);
    } else {
      next(err);
    }
  }
});

/* GET one order */
router.get('/:orderId', async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.orderId);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
