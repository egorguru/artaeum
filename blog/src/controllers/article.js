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
  const articles = await Article
    .find(query)
    .select('_id title userId createdDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.set('X-Total-Count', await Article.countDocuments(query))
  ctx.body = articles
})

router.get('/by-users', async (ctx) => {
  const { query } = ctx
  if (!validation.getByUsers(query.users)) {
    ctx.throw(400, 'Bad Request')
  }
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  const articles = await Article
    .find({ userId: { $in: query.users.split(',') } })
    .select('_id title userId createdDate category')
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
    .find({ $text: { $search: ctx.query.query } })
    .select('_id title userId createdDate category')
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.set('X-Total-Count', await Article.countDocuments(query))
  ctx.body = articles
})

router.get('/:id', async (ctx) => {
  const article = await Article.findById(ctx.params.id)
  if (article) {
    ctx.body = article
  } else {
    ctx.throw(404)
  }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { title, body, image, category } = ctx.request.body
  if (!validation.create(title, body, image, category)) {
    ctx.throw(400, 'Bad Request')
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
    ctx.throw(400, 'Bad Request')
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
  if (validation.image(image)) {
    await saveImage(ctx.eureka, image, article._id)
  }
  ctx.body = article
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
