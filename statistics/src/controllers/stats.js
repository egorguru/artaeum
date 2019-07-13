const { Router } = require('dragonrend')

const Stats = require('../models/Stats')
const { authenticate, justAuthenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/stats' })

router.post('/', justAuthenticate, async ({ user, request, response }) => {
  const { ip, url } = request.body
  const userId = user ? user.name : 'unauthorized'
  await new Stats({ ip, url, userId }).save()
  response.status = 201
})

router.get('/', authenticate, async ({ user, response }) => {
  if (user.authorities.find((val) => val.authority === 'admin')) {
    response.body = await Stats.find()
  } else {
    response.status = 403
  }
})

module.exports = router
