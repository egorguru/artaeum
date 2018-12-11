const mongoose = require('mongoose')

const config = require('./config-client')

module.exports = () => {
  config.then((c) => {
    mongoose
      .connect(process.env[c.get('mongodb.uri')], { useNewUrlParser: true })
      .then((() => console.log('MongoDB has been connected')))
      .catch((error) => console.log(error))
  })
}
