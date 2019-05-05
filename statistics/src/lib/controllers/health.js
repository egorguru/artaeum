const { Router } = require('dragonrend')

const router = new Router()

router.get('/health', ({ response }) => response.body = { status: 'UP' })

module.exports = router
