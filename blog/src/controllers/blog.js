const Router = require('koa-router')
const passport = require('koa-passport')

const Blog = require('../models/Blog')

const router = new Router().prefix('/blogs')

router.get('/', async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const blogs = await Blog
    .find()
    .sort({ date: -1 })
    .skip(page * size)
    .limit(size)
  ctx.body = blogs
})

router.get('/:id', async (ctx) => {
  const blog = await Blog.findById(ctx.params.id)
  ctx.body = blog
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { body } = ctx.request.body
  const blog = await new Blog({
    body,
    userId: ctx.state.user.name
  }).save()
  ctx.status = 201
  ctx.body = blog
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, body } = ctx.request.body
  const comment = await Blog.findOneAndUpdate(
    { _id, userId: ctx.state.user.name },
    { $set: { body } },
    { new: true }
  )
  ctx.body = comment
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  await Blog.remove({
    _id: ctx.params.id,
    userId: ctx.state.user.name
  })
  ctx.body = { message: 'Blog has been deleted' }
})

module.exports = router.routes()
