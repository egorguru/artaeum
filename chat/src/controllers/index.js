import Router from 'koa-router'

import health from './health'
import message from './message'

const router = new Router().prefix('/chat')

router.use(health, message)

export default router
