const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  faceImageName: String,
});

module.exports = mongoose.model('User', userSchema);
