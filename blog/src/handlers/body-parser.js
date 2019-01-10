const bodyParser = require('koa-bodyparser')

module.exports = bodyParser({
  jsonLimit: '5mb'
})
