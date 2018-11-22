const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: [
      'PENDING',
      'IN_PROGRESS',
      'COLLECTION',
      'COMPLETED',
      'FAILED',
    ],
    default: 'PENDING',
    required: true,
  },
  orderedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
