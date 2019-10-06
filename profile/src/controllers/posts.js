const { Router } = require('dragonrend')
const { Post } = require('../models')

const { authenticate } = require('../lib/helpers')

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

const router = new Router({ prefix: '/posts' })

router.get('/', async ({ request: { query }, response }) => {
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

router.get('/:id', async ({ request: { params: { id } }, response }) => {
  response.json(await Post.findByPk(id))
})

router.get('/search', async ({ request: { query }, response }) => {
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

router.post('/', authenticate, async ({
  request: { body: { text } },
  user: { name },
  response
}) => response.status(201).json(await Post.create({ text, userId: name })))

router.delete('/:id', authenticate, async ({
  request: { params: { id } }, response
}) => {
  await Post.destroy({ where: { id } })
  response.json({ message: 'Post has been deleted' })
})

module.exports = router
