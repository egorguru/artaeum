const Router = require('koa-router')
const passport = require('koa-passport')

const Article = require('../models/Article')
const Category = require('../models/Category')
const storage = require('../client/storage')
const validation = require('../validation/article')

const router = new Router().prefix('/articles')

const IMAGE_NAME_END = '-article'
const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

router.get('/', async (ctx) => {
  const { query } = ctx
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  query.isPublished = true
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate publishedDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.set('X-Total-Count', await Article.countDocuments(query))
  ctx.body = articles
})

router.get('/my', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { query } = ctx
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  query.userId = ctx.state.user.name
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate publishedDate category isPublished')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.set('X-Total-Count', await Article.countDocuments(query))
  ctx.body = articles
})

router.get('/search', async (ctx) => {
  const { query } = ctx
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  const articles = await Article
    .find({
      isPublished: true,
      $text: { $search: ctx.query.query }
    })
    .select('_id title userId createdDate publishedDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.set('X-Total-Count', await Article.countDocuments(query))
  ctx.body = articles
})

router.get('/:_id', async (ctx) => {
  const { _id } = ctx.params
  const article = await Article.findOne({
    _id,
    isPublished: true
  })
  if (article) {
    ctx.body = article
  } else {
    ctx.throw(404)
  }
})

router.get('/my/:_id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id } = ctx.params
  const article = await Article.findOne({
    _id,
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
  if (!validation.create(title, body, image, category)) {
    ctx.throw(400, 'Bad Credentials')
  }
  const entity = {
    title,
    body,
    userId: ctx.state.user.name
  }
  if (category) {
    const existsCategory = await Category.findById(category)
    if (existsCategory) {
      entity.category = existsCategory._id
    }
  }
  const article = await new Article(entity).save()
  await saveImage(ctx.eureka, image, article._id)
  ctx.status = 201
  ctx.body = article
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, title, body, image, category } = ctx.request.body
  if (!validation.update(_id, title, body, category)) {
    ctx.throw(400, 'Bad Credentials')
  }
  const entity = { title, body }
  if (category) {
    const existsCategory = await Category.findById(category)
    if (existsCategory) {
      entity.category = existsCategory._id
    }
  }
  const article = await Article.findOneAndUpdate(
    { _id, userId: ctx.state.user.name },
    { $set: entity },
    { new: true }
  )
  if (!validation.image(image)) {
    await saveImage(ctx.eureka, image, article._id)
  }
  ctx.body = article
})

router.put('/publish', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const article = await Article.findOneAndUpdate(
    { _id: ctx.request.body._id, userId: ctx.state.user.name },
    { $set: {
      isPublished: true,
      publishedDate: Date.now()
    } },
    { new: true }
  )
  ctx.body = article
})

router.put('/status', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, isPublished } = ctx.request.body
  const article = await Article.findById(_id)
  if (article.publishedDate) {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id },
      { $set: { isPublished } },
      { new: true }
    )
    ctx.body = updatedArticle
  } else {
    ctx.throw(400, 'Article is not published')
  }
})

router.delete('/:_id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id } = ctx.params
  await Article.deleteOne({
    _id,
    userId: ctx.state.user.name
  })
  await deleteImage(ctx.eureka, _id)
  ctx.body = { message: 'Article has been deleted' }
})

async function saveImage(eureka, image, articleId) {
  await storage.save(prepareUri(eureka), image, articleId + IMAGE_NAME_END)
}

async function deleteImage(eureka, articleId) {
  await storage.delete(prepareUri(eureka), articleId + IMAGE_NAME_END + '.jpg')
}

function prepareUri(eureka) {
  const storageInstance = eureka.getInstancesByAppId('storage')[0]
  return `http://${storageInstance.hostName}:${storageInstance.port.$}/storage/images/blog/`
}

module.exports = router.routes()
