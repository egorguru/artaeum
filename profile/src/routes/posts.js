const { routing } = require('dragonrend')
const { Post } = require('../models')

const { authenticate } = require('../lib/helpers')

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

module.exports = { GET, POST, DELETE } = routing({ prefix: '/posts' })

GET('/', async ({ request: { query }, response }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  response
    .header('x-total-count', await Post.count({ where: query }))
    .json(await Post.findAll({
      limit: size,
      offset: page * size,
      where: query,
      order: [['id', 'DESC']]
    }))
})

GET('/:id', async ({ request, response }) => {
  response.json(await Post.findByPk(request.params.id))
})

GET('/search', async ({ request: { query }, response }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  response.json(await Post.findAll({
    limit: size,
    offset: page * size,
    where: { text: { $like: '%' + query.query + '%' } },
    order: [['id', 'DESC']]
  }))
})

POST('/', authenticate, async ({ request, user, response }) => {
  const post = await Post.create({
    text: request.body.text,
    userId: user.name
  })
  response.status(201).json(post)
})

DELETE('/:id', authenticate, async ({ request, response }) => {
  await Post.destroy({ where: { id: request.params.id } })
  response.json({ message: 'Post has been deleted' })
})
