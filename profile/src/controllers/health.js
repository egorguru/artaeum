const { Router } = require('dragonrend')

const router = new Router()

router.get('/health', (ctx) => ctx.response.json({ status: 'UP' }))

module.exports = router
