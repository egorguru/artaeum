const Router = require('koa-router')
const passport = require('koa-passport')

const Article = require('../models/Article')
const storage = require('../client/storage')

const router = new Router().prefix('/articles')

const IMAGE_NAME_END = '-article'

const getTotalCount = async (query) => {
  const articles = await Article.find(query)
  return articles.length
}

router.get('/', async (ctx) => {
  const userId = ctx.query.userId
  const query = userId ? { userId } : {}
  const page = +ctx.query.page
  const size = +ctx.query.size
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  const totalCount = await getTotalCount(query)
  ctx.set('X-Total-Count', totalCount)
  ctx.body = articles
})

router.get('/search', async (ctx) => {
  const query = {
    $text: {
      $search: ctx.query.query
    }
  }
  const page = +ctx.query.page
  const size = +ctx.query.size
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  const totalCount = await getTotalCount(query)
  ctx.set('X-Total-Count', totalCount)
  ctx.body = articles
})

router.get('/:id', async (ctx) => {
  const article = await Article.findById(ctx.params.id)
  if (article) {
    ctx.body = article
  } else {
    ctx.status = 404
  }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { title, body, image } = ctx.request.body
  if (title.trim() !== '' && body.trim() !== '' && image.trim() !== '') {
    const article = await new Article({
      title,
      body,
      userId: ctx.state.user.name,
      createdDate: Date.now()
    }).save()
    await storage.save(image, article._id + IMAGE_NAME_END)
    ctx.status = 201
    ctx.body = article
  } else {
    ctx.status = 400
  }
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, title, body, image } = ctx.request.body
  if (_id && title.trim() !== '' && body.trim() !== '') {
    const article = await Article.findOneAndUpdate(
      { _id, userId: ctx.state.user.name },
      { $set: {
        title,
        body
      } },
      { new: true }
    )
    if (image && image.trim() !== '') {
      await storage.save(image, article._id + IMAGE_NAME_END)
    }
    ctx.body = article
  } else {
    ctx.status = 400
  }
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const id = ctx.params.id
  await Article.deleteOne({
    _id: id,
    userId: ctx.state.user.name
  })
  await storage.delete(id + IMAGE_NAME_END + '.jpg')
  ctx.body = { message: 'Article has been deleted' }
})

module.exports = router.routes()
