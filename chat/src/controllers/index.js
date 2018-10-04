const Router = require('koa-router')

const health = require('./health')
const message = require('./message')

const router = new Router().prefix('/chat')

router.use(health, message)

module.exports = router
