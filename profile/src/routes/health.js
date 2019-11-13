const { routing } = require('dragonrend')

module.exports = { GET } = routing()

GET('/health', (ctx) => ctx.response.json({ status: 'UP' }))
