const { routing, json } = require('dragonrend')

const { GET } = module.exports = routing()

GET('/health', () => json({ body: { status: 'UP' } }))
