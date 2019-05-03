const mongoose = require('mongoose')

const config = require('./config')

module.exports = () => {
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then((() => console.log('MongoDB has been connected')))
    .catch((error) => console.log(error))
}
