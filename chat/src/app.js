const Koa = require('koa')

const mongoClient = require('./lib/mongo-client')
const handlers = require('./handlers')
const controllers = require('./controllers')

const app = new Koa()

handlers.forEach((h) => app.use(h))

app.use(controllers.routes())
app.use(controllers.allowedMethods())

mongoClient()

module.exports = app
