const { Router } = require('dragonrend')
const { Subscription } = require('../models')

const { authenticate } = require('../lib/helpers')

const router = new Router({ prefix: '/subscriptions' })

router.get('/', async ({ request: { query }, response }) => {
  response.json(await Subscription.findAll({ where: query }))
})

router.post('/', authenticate, async ({
  user: { name },
  request: { body: { profileId } },
  response
}) => {
  response
    .status(201)
    .json(await Subscription.create({ subscriberId: name, profileId }))
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
    response.json({ message: 'Subscription has been deleted' })
  } else {
    response.status(404).json({ message: 'Subscription has not been found' })
  }
})

module.exports = router
