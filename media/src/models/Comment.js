const mongoose = require('mongoose')
const { Schema } = mongoose

const commentsSchema = new Schema({
  text: {
    type: String,
    minlength: 1
  },
  resourceType: {
    type: String,
    required: true
  },
  resourceId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('comments', commentsSchema)
