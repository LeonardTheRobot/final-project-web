const express = require('express');

const Robot = require('../../models/robot');

const router = express.Router();

/* GET robot information */
router.get('/', async (_req, res, next) => {
  try {
    const data = await Robot.findOne();
    if (!data) {
      next();
    } else {
      res.json(data);
    }
  } catch (err) {
    next(err);
  }
});

/* PUT update robot information */
router.put('/', async (req, res, next) => {
  try {
    // Take the fields to be updated from the request
    // If there are invalid fields in here they will be ignored by Mongoose
    const updateData = req.body;
    // Run a findOneAndUpdate to get the robot document and update it
    // The option upsert creates the robot document if it doesn't already exist
    const newData = await Robot.findOneAndUpdate({}, {
      $set: updateData,
    }, {
      new: true, // tell findOneAndUpdate to return the new document
      upsert: true, // create the document if it doesn't exist
      runValidators: true, // ensure that our validation is run
      setDefaultsOnInsert: true, // if creating the document, insert default values
    });
    res.json(newData);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      // If the error is a Mongoose ValidationError or a CastError send a 400 Bad Request
      res.status(400).json(err);
    } else {
      // Otherwise, forward to error handler middleware
      next(err);
    }
  }
});

module.exports = router;
