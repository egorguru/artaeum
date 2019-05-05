const { Router } = require('dragonrend')

const health = require('./health')
const stats = require('./stats')

const router = new Router({ prefix: '/statistics' })

router.merge(health, stats)

module.exports = router
