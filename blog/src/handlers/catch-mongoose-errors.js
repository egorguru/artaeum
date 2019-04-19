const MongooseError = require('mongoose').Error

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    if (e instanceof MongooseError) {
      ctx.throw(400, 'Bad Credentials')
    } else {
      ctx.throw(e)
    }
  }
}