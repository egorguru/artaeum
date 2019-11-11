const { routify, GET, POST, DELETE } = require('dragonrend')

const { Subscription } = require('../models')
const { authenticate } = require('../lib/helpers')

module.exports = routify({ prefix: '/subscriptions' })([
  [GET, '/', async ({ request: { query }, response }) =>
    response.json(await Subscription.findAll({ where: query }))],
  [POST, '/', authenticate, async ({
    user: { name },
    request: { body: { profileId } },
    response
  }) =>
    response
      .status(201)
      .json(await Subscription.create({ subscriberId: name, profileId }))],
  [DELETE, '/', authenticate, async ({
    user: { name },
    request: { body: { profileId } },
    response
  }) => {
    const subscription = await Subscription.findOne({
      where: { subscriberId: name, profileId }
    })
    if (subscription) {
      subscription.destroy()
      response.json({ message: 'Subscription has been deleted' })
    } else {
      response.status(404).json({ message: 'Subscription has not been found' })
    }
  }]
])
