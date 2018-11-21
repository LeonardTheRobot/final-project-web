const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new Schema({
  user: ObjectId,
  zone: String,
  items: [ObjectId],
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
  },
  orderedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Order', orderSchema);
