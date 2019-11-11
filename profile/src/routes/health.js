const { routify, GET } = require('dragonrend')

module.exports = routify()([
  [GET, '/health', (ctx) => ctx.response.json({ status: 'UP' })]
])
