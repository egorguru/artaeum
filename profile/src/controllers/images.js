const { Router } = require('dragonrend')

const { authenticate } = require('../lib/helpers')
const storage = require('../client/storage')

const router = new Router({ prefix: '/images' })

const AVATAR = '-avatar'
const BACKGROUND = '-background'

router.post('/avatar', authenticate, async ({ eureka, request, user }) => {
  storage.save(eureka, request.body.image, user.name + AVATAR)
})

router.post('/background', authenticate, async ({ eureka, request, user }) => {
  storage.save(eureka, request.body.image, user.name + BACKGROUND)
})

module.exports = router
