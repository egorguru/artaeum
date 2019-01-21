const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 20
  },
  userId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('categories', categoriesSchema)
