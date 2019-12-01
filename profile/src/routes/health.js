const { routing, json } = require('dragonrend')

const { GET } = module.exports = routing()

GET('/health', () => json({ status: 'UP' }))
