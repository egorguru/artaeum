const http = require('http')
const { Dragonrend } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const response = require('dragonrend-response')

const controllers = require('./lib/controllers')
const mongoConfig = require('./lib/mongo-config')

const app = new Dragonrend()

app.addHandlerBefore(jsonBodyParser.before)
app.addHandlerBefore(response.before)

app.addHandlerAfter(response.after)

app.merge(controllers)

mongoConfig()

module.exports = http.createServer(app.toListener())
