const { routing } = require('dragonrend')

const { authenticate } = require('../lib/helpers')
const storage = require('../client/storage')

const AVATAR = '-avatar'
const BACKGROUND = '-background'

const { POST } = module.exports = routing({ prefix: '/images' })

POST('/avatar', authenticate, async ({ eureka, request, user }) => {
  await storage.save(eureka, request.body.image, user.name + AVATAR)
})
  
POST('/background', authenticate, async ({ eureka, request, user }) => {
  await storage.save(eureka, request.body.image, user.name + BACKGROUND)
})
