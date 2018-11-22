const express = require('express');

const Item = require('../../models/item');

const router = express.Router();

/* GET all items */
router.get('/', async (req, res, next) => {
  try {
    const data = await Item.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/* POST create a new item */
router.post('/', async (req, res, next) => {
  try {
    const item = new Item({
      name: req.body.name,
      price: req.body.price,
    });
    const data = await item.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400).json(err);
    } else {
      next(err);
    }
  }
});

/* GET one item by name */
router.get('/:name', async (req, res, next) => {
  try {
    const data = await Item.find({ name: req.params.name });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
