const Router = require('koa-router')
const passport = require('koa-passport')

const Comment = require('../models/Comment')
const validation = require('../validation/comment')

const router = new Router().prefix('/comments')

router.get('/:resourceType/:resourceId', async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const resourceType = ctx.params.resourceType
  const resourceId = ctx.params.resourceId
  const comments = await Comment
    .find({ resourceType, resourceId })
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.body = comments
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { text, resourceType, resourceId } = ctx.request.body
  if (!validation.create(text, resourceType, resourceId)) {
    ctx.throw(400)
  }
  const comment = await new Comment({
    text,
    resourceType,
    resourceId,
    userId: ctx.state.user.name,
    createdDate: Date.now()
  }).save()
  ctx.status = 201
  ctx.body = comment
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, text } = ctx.request.body
  if (!validation.update(_id, text)) {
    ctx.throw(400)
  }
  const comment = await Comment.findOneAndUpdate(
    { _id, userId: ctx.state.user.name },
    { $set: { text } },
    { new: true }
  )
  ctx.body = comment
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  await Comment.remove({
    _id: ctx.params.id,
    userId: ctx.state.user.name
  })
  ctx.body = { message: 'Comment has been deleted' }
})

module.exports = router.routes()
