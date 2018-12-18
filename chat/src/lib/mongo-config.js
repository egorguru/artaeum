const mongoose = require('mongoose')

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then((() => console.log('MongoDB has been connected')))
    .catch((error) => console.log(error))
}
