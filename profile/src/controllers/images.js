const { Router } = require('dragonrend')

const { authenticate } = require('../lib/helpers')
const storage = require('../client/storage')

const AVATAR = '-avatar'
const BACKGROUND = '-background'

const router = new Router({ prefix: '/images' })

router.post('/avatar', authenticate, async ({
  eureka,
  request: { body: { image } },
  user: { name }
}) => storage.save(eureka, image, name + AVATAR))

router.post('/background', authenticate, async ({
  eureka,
  request: { body: { image } },
  user: { name }
}) => storage.save(eureka, image, name + BACKGROUND))

module.exports = router
