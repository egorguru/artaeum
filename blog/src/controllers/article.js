const Router = require('koa-router')
const passport = require('koa-passport')

const Article = require('../models/Article')

const router = new Router().prefix('/articles')

router.get('/', async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const articles = await Article
    .find()
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.body = articles
})

router.get('/:id', async (ctx) => {
  const article = await Article.findById(ctx.params.id)
  ctx.body = article
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { body } = ctx.request.body
  const article = await new Article({
    body,
    userId: ctx.state.user.name
  }).save()
  ctx.status = 201
  ctx.body = article
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, body } = ctx.request.body
  const article = await Article.findOneAndUpdate(
    { _id, userId: ctx.state.user.name },
    { $set: { body } },
    { new: true }
  )
  ctx.body = article
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  await Article.remove({
    _id: ctx.params.id,
    userId: ctx.state.user.name
  })
  ctx.body = { message: 'Article has been deleted' }
})

module.exports = router.routes()
