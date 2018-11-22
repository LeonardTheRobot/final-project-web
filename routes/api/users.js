const express = require('express');

const User = require('../../models/user');

const router = express.Router();

/* GET all users */
router.get('/', async (req, res, next) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/* POST create a new user */
router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      faceImageName: req.body.faceImageName,
    });
    const data = await user.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400).json(err);
    } else {
      next(err);
    }
  }
});

module.exports = router;
