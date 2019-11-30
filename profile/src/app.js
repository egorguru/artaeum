const { dragonrend } = require('dragonrend')

module.exports = dragonrend({
  routing: {
    prefix: '/profile'
  },
  autoIncluding: {
    rootDir: __dirname
  }
})
