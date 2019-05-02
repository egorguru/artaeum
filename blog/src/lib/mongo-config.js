const mongoose = require('mongoose')

const config = require('./config')

module.exports = () => {
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 10000
    })
    .then((() => console.log('MongoDB has been connected')))
    .catch((error) => console.log(error))
}
