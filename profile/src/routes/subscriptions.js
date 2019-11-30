const { routing, json } = require('dragonrend')

const { Subscription } = require('../models')
const { authenticate } = require('../lib/helpers')

const { GET, POST, DELETE } = module.exports = routing({ prefix: '/subscriptions' })

GET('/', async ctx => json({
  body: await Subscription.findAll({ where: ctx.request.query })
}))

POST('/', authenticate, async ({ user, request }) => {
  const subscription = await Subscription.create({
    subscriberId: user.name,
    profileId: request.body.profileId
  })
  return json({ status: 201, body: subscription })
})

DELETE('/', authenticate, async ({ user, request }) => {
  const subscription = await Subscription.findOne({
    where: { subscriberId: user.name, profileId: request.body.profileId }
  })
  if (subscription) {
    subscription.destroy()
    return json({
      body: { message: 'Subscription has been deleted' }
    })
  } else {
    return json({
      status: 404,
      body: { message: 'Subscription has not been found' }
    })
  }
})
