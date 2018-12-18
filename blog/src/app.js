const Koa = require('koa')

const mongoConfig = require('./lib/mongo-config')
const eureka = require('./lib/eureka-client')
const handlers = require('./handlers')
const controllers = require('./controllers')

const app = new Koa()

handlers.forEach((h) => app.use(h))

app.use(controllers.routes())
app.use(controllers.allowedMethods())

mongoConfig()

eureka.start()

module.exports = app
