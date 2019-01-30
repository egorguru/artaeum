const Router = require('koa-router')
const passport = require('koa-passport')

const Article = require('../models/Article')
const Category = require('../models/Category')
const storage = require('../client/storage')

const router = new Router().prefix('/articles')

const IMAGE_NAME_END = '-article'

const getTotalCount = async (query) => {
  const articles = await Article.find(query)
  return articles.length
}

router.get('/', async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const { userId, category } = ctx.query
  const query = {
    isPublished: true
  }
  if (userId) {
    query.userId = userId
  }
  if (category) {
    query.category = category
  }
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate publishedDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  const totalCount = await getTotalCount(query)
  ctx.set('X-Total-Count', totalCount)
  ctx.body = articles
})

router.get('/my', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const { category } = ctx.query
  const query = {
    userId: ctx.state.user.name,
  }
  if (category) {
    query.category = category
  }
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate publishedDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  const totalCount = await getTotalCount(query)
  ctx.set('X-Total-Count', totalCount)
  ctx.body = articles
})

router.get('/search', async (ctx) => {
  const query = {
    isPublished: true,
    $text: {
      $search: ctx.query.query
    }
  }
  const page = +ctx.query.page
  const size = +ctx.query.size
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate publishedDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  const totalCount = await getTotalCount(query)
  ctx.set('X-Total-Count', totalCount)
  ctx.body = articles
})

router.get('/:id', async (ctx) => {
  const article = await Article.findOne({
    _id: ctx.params.id,
    isPublished: true
  })
  if (article) {
    ctx.body = article
  } else {
    ctx.throw(404)
  }
})

router.get('/my/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const article = await Article.findOne({
    _id: ctx.params.id,
    userId: ctx.state.user.name
  })
  if (article) {
    ctx.body = article
  } else {
    ctx.throw(404)
  }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { title, body, image, category } = ctx.request.body
  let existsCategory
  if (category) {
    try {
      existsCategory = await Category.findById(category)
    } catch (e) {
      ctx.throw(400)
    }
  }
  if (title.trim() !== '' && body.trim() !== '' && image.trim() !== '') {
    const article = await new Article({
      title,
      body,
      userId: ctx.state.user.name,
      createdDate: Date.now(),
      category: existsCategory ? existsCategory._id : undefined
    }).save()
    await storage.save(image, article._id + IMAGE_NAME_END)
    ctx.status = 201
    ctx.body = article
  } else {
    ctx.throw(400)
  }
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, title, body, image, category } = ctx.request.body
  const updateParams = { title, body }
  if (category) {
    try {
      existsCategory = await Category.findById(category)
    } catch (e) {
      ctx.throw(400)
    }
    if (existsCategory) {
      updateParams.category = existsCategory._id
    }
  }
  if (_id && title.trim() !== '' && body.trim() !== '') {
    const article = await Article.findOneAndUpdate(
      { _id, userId: ctx.state.user.name },
      { $set: updateParams },
      { new: true }
    )
    if (image && image.trim() !== '') {
      await storage.save(image, article._id + IMAGE_NAME_END)
    }
    ctx.body = article
  } else {
    ctx.throw(400)
  }
})

router.put('/publish', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const _id = ctx.request.body._id
  if (_id) {
    const article = await Article.findOneAndUpdate(
      { _id, userId: ctx.state.user.name },
      { $set: {
        isPublished: true,
        publishedDate: Date.now()
      } },
      { new: true }
    )
    ctx.body = article
  } else {
    ctx.throw(400)
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
