const { Router } = require('dragonrend')
const { Post } = require('../models')

const { authenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/posts' })

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

router.get('/', async ({ query, res, response }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  res.setHeader('x-total-count', await Post.count({ where: query }))
  response.body = await Post.findAll({
    limit: size,
    offset: page * size,
    where: query,
    order: [['id', 'DESC']]
  })
})

router.get('/:id', async ({ response, params }) => {
  response.body = await Post.findByPk(params.id)
})

router.get('/search', async ({ query, response }) => {
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  response.body = await Post.findAll({
    limit: size,
    offset: page * size,
    where: { text: { $like: '%' + query.query + '%' } },
    order: [['id', 'DESC']]
  })
})

router.post('/', authenticate, async ({ request, user, response }) => {
  const { text } = request.body
  const userId = user.name
  response.body = await Post.create({ text, userId })
  response.status = 201
})

router.delete('/:id', authenticate, async ({ params, response }) => {
  await Post.destroy({ where: { id: params.id } })
  response.body = { message: 'Post has been deleted' }
})

module.exports = router
