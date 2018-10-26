const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

const blogsSchema = new mongoose.Schema({
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
    default: Date.now()
  }
})

blogsSchema.plugin(autoIncrement.plugin, { model: 'blogs' })

module.exports = mongoose.model('blogs', blogsSchema)
