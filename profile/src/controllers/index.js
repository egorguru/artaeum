const { Router } = require('dragonrend')

const health = require('./health')
const posts = require('./posts')
const subscriptions = require('./subscriptions')

const router = new Router({ prefix: '/profile' })

router.merge(health, posts, subscriptions)

module.exports = router
