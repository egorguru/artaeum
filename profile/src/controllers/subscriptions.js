const { Router } = require('dragonrend')
const { Subscription } = require('../models')

const { authenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/subscriptions' })

router.get('/', async (ctx) => {
  ctx.response.body = await Subscription.findAll({ where: ctx.request.query })
})

router.post('/', authenticate, async (ctx) => {
  const subscriberId = ctx.user.name
  const profileId = ctx.request.body.profileId
  ctx.response.body = await Subscription.create({ subscriberId, profileId })
  ctx.response.status = 201
})

router.delete('/', authenticate, async (ctx) => {
  const subscriberId = ctx.user.name
  const profileId = ctx.request.body.profileId
  const subscription = await Subscription.findOne({ where: { subscriberId, profileId } })
  if (subscription) {
    subscription.destroy()
    ctx.response.body = { message: 'Subscription has been deleted' }
  } else {
    ctx.response.body = { message: 'Subscription has not been found' }
    ctx.response.status = 404
  }
})

module.exports = router
