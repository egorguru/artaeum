const { Dragonrend } = require('dragonrend')

const controllers = require('./controllers')
const mongoConfig = require('./lib/mongo-config')

const app = new Dragonrend()

app.merge(controllers)

mongoConfig()

module.exports = app
