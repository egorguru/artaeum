const { Router } = require('dragonrend')

const health = require('./health')
const posts = require('./posts')

const router = new Router({ prefix: '/profile' })

router.merge(health, posts)

module.exports = router
