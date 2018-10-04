const Router = require('koa-router')

const comments = require('./comment')

const router = new Router().prefix('/comment')

router.use(comments)

module.exports = router
