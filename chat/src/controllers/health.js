import Router from 'koa-router'

const router = new Router()

router.get('/health', (ctx) => {
  ctx.status = 200;
  ctx.body = { status: 'UP' }
})

export default router.routes()
