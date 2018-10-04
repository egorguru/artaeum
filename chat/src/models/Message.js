const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('messages', messagesSchema)
