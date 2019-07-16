const { Dragonrend } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const response = require('dragonrend-response')

const controllers = require('./controllers')

const app = new Dragonrend()

jsonBodyParser(app)
response(app)

app.merge(controllers)

module.exports = app
