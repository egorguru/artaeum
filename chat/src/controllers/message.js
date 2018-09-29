import Router from 'koa-router'
import passport from 'koa-passport'

import Message from '../models/Message'

const router = new Router().prefix('/messages')

router.get('/:receiver', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const messages = await Message
    .find({ userId: ctx.state.user.name, receiver: ctx.params.receiver })
    .sort({ date: -1 })
    .skip(+ctx.query.offset)
    .limit(+ctx.query.limit)
  ctx.body = messages
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { text, receiver } = ctx.request.body
  const message = await new Message({
    text: text,
    sender: ctx.state.user.name,
    receiver: receiver
  }).save()
  ctx.body = message
})

router.put('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const message = await Message.findByIdAndUpdate(
    ctx.params.id,
    { $set: { text: ctx.request.body.text } },
    { new: true }
  )
  ctx.body = message
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (ctx) => {
  await Message.findOneAndRemove({
    _id: ctx.params.id,
    sender: ctx.state.user.name
  })
})

export default router.routes()
