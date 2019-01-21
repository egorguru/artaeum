const Router = require('koa-router')

const article = require('./article')
const category = require('./category')
const health = require('./health')

const router = new Router().prefix('/blog')

router.use(article, category, health)

module.exports = router
