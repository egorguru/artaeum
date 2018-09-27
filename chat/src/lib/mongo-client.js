import mongoose from 'mongoose'

import config from './config-client'

export default function() {
  config.then((c) => {
    mongoose
      .connect(
        `mongodb://${process.env[c.get('mongodb.username')]}:${process.env[c.get('mongodb.password')]}@${c.get('mongodb.host')}:${c.get('mongodb.port')}/${c.get('mongodb.database')}`,
        { useNewUrlParser: true }
      )
      .then((() => console.log('MongoDB has been connected')))
      .catch((error) => console.log(error))
  })
}
