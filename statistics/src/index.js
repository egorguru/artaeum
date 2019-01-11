const mongoConfig = require('./lib/mongo-config')
const eureka = require('./lib/eureka-client')
const server = require('./lib/server')

mongoConfig()

eureka.start()

server.init()
