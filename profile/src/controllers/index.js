const { Router } = require('dragonrend')

const health = require('./health')

const router = new Router({ prefix: '/profile' })

router.merge(health)

module.exports = router
