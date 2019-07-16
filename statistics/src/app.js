const http = require('http')
const { Dragonrend } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const response = require('dragonrend-response')

const controllers = require('./controllers')
const mongoConfig = require('./lib/mongo-config')

const app = new Dragonrend()

jsonBodyParser(app)
response(app)

app.merge(controllers)

mongoConfig()

module.exports = http.createServer(app.toListener())
