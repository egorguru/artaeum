const { Router } = require('dragonrend')

const health = require('./health')
const posts = require('./posts')
const subscriptions = require('./subscriptions')
const images = require('./images')

const router = new Router({ prefix: '/profile' })

router.merge(health, posts, subscriptions, images)

module.exports = router
