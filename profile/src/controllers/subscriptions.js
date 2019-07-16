const { Router } = require('dragonrend')
const { Subscription } = require('../models')

const { authenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/subscriptions' })

router.get('/', async ({ response, request }) => {
  response.body = await Subscription.findAll({ where: request.query })
})

router.post('/', authenticate, async ({ user, request, response }) => {
  const subscriberId = user.name
  const profileId = request.body.profileId
  response.body = await Subscription.create({ subscriberId, profileId })
  response.status = 201
})

router.delete('/', authenticate, async ({ user, request, response }) => {
  const subscriberId = user.name
  const profileId = request.body.profileId
  const subscription = await Subscription.findOne({ where: { subscriberId, profileId } })
  if (subscription) {
    subscription.destroy()
    response.body = { message: 'Subscription has been deleted' }
  } else {
    response.body = { message: 'Subscription has not been found' }
    response.status = 404
  }
})

module.exports = router
