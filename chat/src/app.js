import Koa from 'koa'

import mongoClient from './lib/mongo-client'
import handlers from './handlers'
import controllers from './controllers'

const app = new Koa()

handlers.forEach((h) => app.use(h))

app.use(controllers.routes())
app.use(controllers.allowedMethods())

mongoClient()

export default app
