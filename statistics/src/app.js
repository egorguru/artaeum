const { Dragonrend } = require('dragonrend')

const mongoConfig = require('./lib/mongo-config')

module.exports = (routesDir) => {
  mongoConfig()
  return new Dragonrend({ prefix: '/statistics', routesDir })
}
