import Router from 'koa-router'

import health from './health'

const router = new Router().prefix('/chat')

router.use(health)

export default router
