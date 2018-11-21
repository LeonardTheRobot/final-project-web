const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const robotSchema = new Schema({
  location: {
    x: Number,
    y: Number,
  },
  orderQueue: [ObjectId],
  inventory: [
    {
      itemId: ObjectId,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Robot', robotSchema);
