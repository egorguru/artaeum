const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

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
  createdDate: {
    type: Date,
    required: true
  }
})

articlesSchema.index({ title: 'text' })

articlesSchema.plugin(autoIncrement.plugin, { model: 'articles' })

module.exports = mongoose.model('articles', articlesSchema)
