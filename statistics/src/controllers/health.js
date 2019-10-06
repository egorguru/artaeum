const { Router } = require('dragonrend')

const router = new Router()

router.get('/health', ({ response }) => response.json({ status: 'UP' }))

module.exports = router
