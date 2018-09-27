import { Schema, model } from 'mongoose'

const messagesSchema = new Schema({
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

export default model('messages', messagesSchema)
