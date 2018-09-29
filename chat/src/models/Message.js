import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: Number,
    required: true
  },
  receiver: {
    type: Number,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model('messages', messagesSchema)
