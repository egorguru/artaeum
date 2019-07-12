const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.checkAuth = async (ctx) => {
  const response = await rp({
    uri: config.uaaUri,
    headers: { 'Authorization': ctx.req.headers['authorization'] },
    json: true
  })
  if (response.statusCode === 401) {
    ctx.res.writeHead(401, { 'Content-Type': 'application/json' })
    ctx.res.end('{"message":"Unauthorized"}')
  } else {
    ctx.user = response.body
  }
}
