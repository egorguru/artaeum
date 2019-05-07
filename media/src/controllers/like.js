const Router = require('koa-router')
const passport = require('koa-passport')

const Like = require('../models/Like')
const validation = require('../validation/like')

const router = new Router().prefix('/likes')

router.get('/', async (ctx) => ctx.body = await Like.find(ctx.query))

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { resourceType, resourceId } = ctx.request.body
  if (!validation.saveOrRemove(resourceType, resourceId)) {
    ctx.throw(400)
  }
  const like = {
    resourceType,
    resourceId,
    userId: ctx.state.user.name
  }
  const existedLike = await Like.findOne(like)
  if (existedLike) {
    await Like.remove(existedLike)
    ctx.body = { message: 'Like has been deleted' }
  } else {
    ctx.status = 201
    ctx.body = await new Like(like).save()
  }
})

module.exports = router.routes()
