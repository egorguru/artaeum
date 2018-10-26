const Router = require('koa-router')

const blog = require('./blog')
const health = require('./health')

const router = new Router().prefix('/blog')

router.use(blog, health)

module.exports = router
