const Router = require('koa-router')
const passport = require('koa-passport')

const Comment = require('../models/Comment')

const router = new Router().prefix('/comments')

router.get('/:resourceType/:resourceId', async (ctx) => {
  const comments = await Comment
    .find({ resourceType: ctx.params.resourceType, resourceId: ctx.params.resourceId })
    .sort({ date: -1 })
    .skip(+ctx.query.offset)
    .limit(+ctx.query.limit)
  ctx.body = comments
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { text, resourceType, resourceId } = ctx.request.body
  const comment = await new Comment({
    text: text,
    resourceType: resourceType,
    resourceId: resourceId,
    userId: ctx.state.user.name
  }).save()
  ctx.status = 201
  ctx.body = comment
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { id, text } = ctx.request.body
  const comment = await Comment.findOneAndUpdate(
    { _id: id, userId: ctx.state.user.name },
    { $set: { text: text } },
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
