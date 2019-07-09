const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1
  },
  body: {
    type: String,
    minlength: 1
  },
  userId: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  publishedDate: {
    type: Date
  }
})

articlesSchema.index({ title: 'text' })

module.exports = mongoose.model('articles', articlesSchema)