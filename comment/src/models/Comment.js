const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  resourceType: {
    type: String,
    required: true
  },
  resourceId: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('comments', commentsSchema)
