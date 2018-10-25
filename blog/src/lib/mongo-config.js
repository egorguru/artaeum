const mongoose = require('mongoose')

const config = require('./config-client')

module.exports = () => {
  config.then((c) => {
    let uri = 'mongodb://'
    if (c.get('mongodb.username') && c.get('mongodb.password')) {
      uri += `${process.env[c.get('mongodb.username')]}:${process.env[c.get('mongodb.password')]}@`
    }
    uri += `${c.get('mongodb.host')}:${c.get('mongodb.port')}/${c.get('mongodb.database')}`
    mongoose
      .connect(uri, { useNewUrlParser: true })
      .then((() => console.log('MongoDB has been connected')))
      .catch((error) => console.log(error))
  })
}
