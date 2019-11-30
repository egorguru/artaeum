const { routing, json } = require('dragonrend')
const { Post } = require('../models')

const { authenticate } = require('../lib/helpers')

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

const { GET, POST, DELETE } = module.exports = routing({ prefix: '/posts' })

GET('/', async ({ request: { query }, response }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  return json({
    headers: {
      'x-total-count': await Post.count({ where: query })
    },
    body: await Post.findAll({
      limit: size,
      offset: page * size,
      where: query,
      order: [['id', 'DESC']]
    })
  })
})

GET('/:id', async ctx => json({
  body: await Post.findByPk(ctx.request.params.id)
}))

GET('/search', async ({ request: { query } }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  return json({
    body: await Post.findAll({
      limit: size,
      offset: page * size,
      where: { text: { $like: '%' + query.query + '%' } },
      order: [['id', 'DESC']]
    })
  })
})

POST('/', authenticate, async ({ request, user }) => {
  const post = await Post.create({
    text: request.body.text,
    userId: user.name
  })
  return json({ status: 201, body: post })
})

DELETE('/:id', authenticate, async ctx => {
  await Post.destroy({ where: { id: ctx.request.params.id } })
  return json({
    body: { message: 'Post has been deleted' }
  })
})
