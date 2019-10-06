const { Dragonrend } = require('dragonrend')

const controllers = require('./controllers')

const app = new Dragonrend()

app.merge(controllers)

module.exports = app
