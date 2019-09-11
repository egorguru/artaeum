const { Router } = require('dragonrend')

const Stats = require('../models/Stats')
const { authenticate, justAuthenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/stats' })

router.post('/', justAuthenticate, async ({
  request: { body: { ip, url } },
  user: { name = 'unauthorized' } = {},
  response
}) => {
  await new Stats({ ip, url, userId: name }).save()
  response.status = 201
})

router.get('/', authenticate, async ({ user: { authorities }, response }) => {
  if (authorities.find((val) => val.authority === 'admin')) {
    response.body = await Stats.find()
  } else {
    response.status = 403
  }
})

module.exports = router
