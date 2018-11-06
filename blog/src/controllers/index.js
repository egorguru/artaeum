const Router = require('koa-router')

const article = require('./article')
const health = require('./health')

const router = new Router().prefix('/blog')

router.use(article, health)

module.exports = router
