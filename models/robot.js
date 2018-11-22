const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

function inventoryDuplicateValidator(vs, cb) {
  const items = vs.map(v => v.item);
  const itemsSet = new Set(items);
  if (items.length === itemsSet.size) {
    console.log('No duplicate items in inventory');
    cb(true);
  } else {
    console.log('Duplicate items in inventory');
    cb(false, 'Duplicate items in inventory');
  }
}

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
      item: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      _id: false,
    }],
    required: true,
    validate: {
      isAsync: true,
      validator: inventoryDuplicateValidator,
    },
  },
});

module.exports = mongoose.model('Robot', robotSchema);
