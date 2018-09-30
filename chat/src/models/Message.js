import mongoose from 'mongoose'

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

export default mongoose.model('messages', messagesSchema)
