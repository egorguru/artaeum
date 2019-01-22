const Router = require('koa-router')
const passport = require('koa-passport')

const Category = require('../models/Category')
const Article = require('../models/Article')

const router = new Router().prefix('/categories')

async function executeIfNotExists(ctx, query, cb) {
  const existCategory = await Category.findOne(query)
  if (!existCategory) {
    await cb()
  } else {
    ctx.body = { message: 'Category already exists' }
    ctx.status = 400
  }
}

router.get('/', async (ctx) => {
  const userId = ctx.query.userId
  if (userId) {
    ctx.body = await Category.find({ userId })
  } else {
    ctx.status = 400
  }
})

router.get('/:id', async (ctx) => {
  const category = await Category.findById(ctx.params.id)
  if (category) {
    ctx.body = category
  } else {
    ctx.status = 404
  }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { name } = ctx.request.body
  const userId = ctx.state.user.name
  if (name.trim() !== '') {
    await executeIfNotExists(ctx, { name, userId }, async () => {
      const category = await new Category({
        name,
        userId,
        createdDate: Date.now()
      }).save()
      ctx.status = 201
      ctx.body = category
    })
  } else {
    ctx.status = 400
  }
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, name } = ctx.request.body
  const userId = ctx.state.user.name
  if (_id && name.trim() !== '') {
    await executeIfNotExists(ctx, { name, userId }, async () => {
      const category = await Category.findOneAndUpdate(
        { _id, userId },
        { $set: { name } },
        { new: true }
      )
      ctx.body = category
    })
  } else {
    ctx.status = 400
  }
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
