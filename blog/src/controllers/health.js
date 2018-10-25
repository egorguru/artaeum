const Router = require('koa-router')

const router = new Router()

router.get('/health', (ctx) => ctx.body = { status: 'UP' })

module.exports = router.routes()
