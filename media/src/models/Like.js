const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
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
    default: Date.now
  }
})

module.exports = mongoose.model('likes', likesSchema)
