const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;