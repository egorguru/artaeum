const { Dragonrend } = require('dragonrend')

module.exports = (routesDir) =>
  new Dragonrend({ prefix: '/profile', routesDir })
