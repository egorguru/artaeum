const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  createdDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('stats', statsSchema)