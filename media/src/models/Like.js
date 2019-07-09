const mongoose = require('mongoose')
const { Schema } = mongoose

const likesSchema = new Schema({
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

module.exports = mongoose.model('likes', likesSchema)
