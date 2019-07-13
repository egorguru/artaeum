const { Dragonrend } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const response = require('dragonrend-response')

const controllers = require('./controllers')

const app = new Dragonrend()

app.addHandlerBefore(jsonBodyParser.before)
app.addHandlerBefore(response.before)

app.addHandlerAfter(response.after)

app.merge(controllers)

module.exports = app
