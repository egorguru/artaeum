const Router = require('koa-router')
const passport = require('koa-passport')

const Message = require('../models/Message')

const router = new Router().prefix('/messages')

router.get('/:receiver', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const page = +ctx.query.page
  const size = +ctx.query.size
  const messages = await Message
    .find({ sender: ctx.state.user.name, receiver: ctx.params.receiver })
    .sort({ createdDate: -1 })
    .skip(page * size)
    .limit(size)
  ctx.body = messages
})

router.post('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { text, receiver } = ctx.request.body
  const message = await new Message({
    text: text,
    sender: ctx.state.user.name,
    receiver: receiver,
    createdDate: Date.now()
  }).save()
  ctx.body = message
})

router.put('/', passport.authenticate('bearer', { session: false }), async (ctx) => {
  const { _id, text } = ctx.request.body
  const message = await Message.findOneAndUpdate(
    { _id, sender: ctx.state.user.name },
    { $set: { text: text } },
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

module.exports = router.routes()
