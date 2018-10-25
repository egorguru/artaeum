const Router = require('koa-router')

const health = require('./health')

const router = new Router().prefix('/blog')

router.use(health)

module.exports = router
