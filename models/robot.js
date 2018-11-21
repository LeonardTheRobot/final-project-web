const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const locationSchema = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
}, {
  _id: false,
});

const robotSchema = new Schema({
  location: {
    type: locationSchema,
    required: true,
  },
  orderQueue: {
    type: [ObjectId],
    required: true,
  },
  inventory: {
    type: [{
      itemId: {
        type: ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }],
    required: true,
  },
});

module.exports = mongoose.model('Robot', robotSchema);
