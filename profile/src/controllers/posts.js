const { Router } = require('dragonrend')
const { Post } = require('../models')

const router = new Router({ prefix: '/posts' })

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

router.get('/', async (ctx) => {
  const { query } = ctx
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  ctx.res.setHeader('x-total-count', await Post.count({ where: query }))
  ctx.response.body = await Post.findAll({
    limit: size,
    offset: page * size,
    where: query
  })
})

router.get('/:id', async (ctx) => {
  console.log(ctx.params)
  console.log(await Post.findByPk(ctx.params.id))
  ctx.response.body = await Post.findByPk(ctx.params.id)
})

router.get('/search', async (ctx) => {
  const { query } = ctx
  const page = +query.page || DEFAULT_PAGE
  const size = +query.size || DEFAULT_PAGE_SIZE
  delete query['page']
  delete query['size']
  ctx.response.body = await Post.findAll({
    limit: size,
    offset: page * size,
    where: { text: { $like: '%' + ctx.query.query + '%' } }
  })
})

router.post('/', async (ctx) => {
  ctx.response.body = await Post.create(ctx.request.body)
  ctx.response.status = 201
})

router.delete('/:id', async (ctx) => {
  await Post.destroy({ where: { id: ctx.params.id } })
  ctx.response.body = { message: 'Post has been deleted' }
})

module.exports = router
