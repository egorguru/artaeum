const { routing } = require('dragonrend')

const { Subscription } = require('../models')
const { authenticate } = require('../lib/helpers')

module.exports = { GET, POST, DELETE } = routing({ prefix: '/subscriptions' })

GET('/', async ({ request, response }) => {
  response.json(await Subscription.findAll({ where: request.query }))
})

POST('/', authenticate, async ({ user, request, response }) => {
  const subscription = await Subscription.create({
    subscriberId: user.name,
    profileId: request.body.profileId
  })
  response.status(201).json(subscription)
})

DELETE('/', authenticate, async ({ user, request, response }) => {
  const subscription = await Subscription.findOne({
    where: { subscriberId: user.name, profileId: request.body.profileId }
  })
  if (subscription) {
    subscription.destroy()
    response.json({ message: 'Subscription has been deleted' })
  } else {
    response.status(404).json({ message: 'Subscription has not been found' })
  }
})
