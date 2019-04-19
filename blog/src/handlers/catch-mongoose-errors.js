const { Error } = require('mongoose')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    if (e instanceof Error) {
      ctx.throw(400, 'Bad Credentials')
    } else {
      ctx.throw(e)
    }
  }
}