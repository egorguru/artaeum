const Router = require('koa-router')
const passport = require('koa-passport')

const Category = require('../models/Category')
const Article = require('../models/Article')
const validation = require('../validation/category')

const router = new Router().prefix('/categories')

async function executeIfNotExists(ctx, query, cb) {
  const existCategory = await Category.findOne(query)
  if (!existCategory) {
    await cb()
  } else {
    ctx.throw(400, 'Category already exists')
  }
}

router.get('/', async (ctx) => {
  const { userId } = ctx.query
  if (userId) {
    ctx.body = await Category.find({ userId })
  } else {
    ctx.throw(400, 'Bad Credentials')
  }
})

router.get('/:id', async (ctx) => {
  const category = await Category.findById(ctx.params.id)
  if (category) {
    ctx.body = category
  } else {
    ctx.throw(400, 'Bad Credentials')
  }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { name } = ctx.request.body
  if (!validation.create(name)) {
    ctx.throw(400, 'Bad Credentials')
  }
  const userId = ctx.state.user.name
  await executeIfNotExists(ctx, { name, userId }, async () => {
    const category = await new Category({
      name,
      userId
    }).save()
    ctx.status = 201
    ctx.body = category
  })
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, name } = ctx.request.body
  if (!validation.update(_id, name)) {
    ctx.throw(400, 'Bad Credentials')
  }
  const userId = ctx.state.user.name
  await executeIfNotExists(ctx, { name, userId }, async () => {
    const category = await Category.findOneAndUpdate(
      { _id, userId },
      { $set: { name } },
      { new: true }
    )
    ctx.body = category
  })
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const id = ctx.params.id
  await Article.updateMany(
    { category: id },
    { $unset: { category: 1 } }
  )
  await Category.deleteOne({
    _id: id,
    userId: ctx.state.user.name
  })
  ctx.body = { message: 'Category has been deleted' }
})

module.exports = router.routes()
