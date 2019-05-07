const Router = require('koa-router')

const comment = require('./comment')
const health = require('./health')
const like = require('./like')

const router = new Router().prefix('/media')

router.use(comment, health, like)

module.exports = router
