const Router = require('koa-router')
const passport = require('koa-passport')

const Comment = require('../models/Comment')
const validation = require('../validation/comment')

const router = new Router().prefix('/comments')

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

router.get('/', async (ctx) => {
  const { resourceType, resourceId } = ctx.query
  if (!validation.get(resourceType, resourceId)) {
    ctx.throw(400, 'Bad Request')
  }
  const page = +ctx.query.page || DEFAULT_PAGE
  const size = +ctx.query.size || DEFAULT_PAGE_SIZE
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
    userId: ctx.state.user.name
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
