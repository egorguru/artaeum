const mongoConfig = require('./lib/mongo-config')
const eureka = require('./lib/eureka-client')
const server = require('./lib/server')

mongoConfig()

if (process.env.NODE_ENV !== 'test') {
  eureka.start()
}

server.init()
