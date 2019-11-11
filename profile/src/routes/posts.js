const { routify, GET, POST, DELETE } = require('dragonrend')
const { Post } = require('../models')

const { authenticate } = require('../lib/helpers')

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

module.exports = routify({ prefix: '/posts' })([
  [GET, '/', async ({ request: { query }, response }) => {
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
  }],
  [GET, '/:id', async ({ request: { params: { id } }, response }) =>
    response.json(await Post.findByPk(id))],
  [GET, '/search', async ({ request: { query }, response }) => {
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
  }],
  [POST, '/', authenticate, async ({
    request: { body: { text } },
    user: { name },
    response
  }) => response.status(201).json(await Post.create({ text, userId: name }))],
  [DELETE, '/:id', authenticate, async ({
    request: { params: { id } }, response
  }) => {
    await Post.destroy({ where: { id } })
    response.json({ message: 'Post has been deleted' })
  }]
])
