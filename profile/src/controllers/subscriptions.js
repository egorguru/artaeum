const { Router } = require('dragonrend')
const { Subscription } = require('../models')

const { authenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/subscriptions' })

router.get('/', async ({ response, request: { query } }) => {
  response.body = await Subscription.findAll({ where: query })
})

router.post('/', authenticate, async ({
  user: { name },
  request: { body: { profileId } },
  response
}) => {
  response.body = await Subscription.create({ subscriberId: name, profileId })
  response.status = 201
})

router.delete('/', authenticate, async ({
  user: { name },
  request: { body: { profileId } },
  response
}) => {
  const subscription = await Subscription.findOne({
    where: { subscriberId: name, profileId }
  })
  if (subscription) {
    subscription.destroy()
    response.body = { message: 'Subscription has been deleted' }
  } else {
    response.body = { message: 'Subscription has not been found' }
    response.status = 404
  }
})

module.exports = router
