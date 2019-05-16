const { Router } = require('dragonrend')

const Stats = require('../models/Stats')
const helpers = require('../lib/helpers')

const router = new Router({ prefix: '/stats' })

router.post('/', async ({ req, request, response }) => {
  const { ip, url } = request.body
  const user = await helpers.checkAuth(req.headers['authorization'])
  await new Stats({
    ip,
    url,
    userId: user ? user.name : 'unauthorized'
  }).save()
  response.status = 201
})

router.get('/', async ({ req, response }) => {
  const user = await helpers.checkAuth(req.headers['authorization'])
  if (user) {
    if (user.authorities.find((val) => val.authority === 'admin')) {
      response.body = await Stats.find()
    } else {
      response.status = 403
    }
  } else {
    response.status = 401
  }
})

module.exports = router
