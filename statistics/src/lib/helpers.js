const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.authenticate = async (ctx) => {
  const response = await request(ctx.req)
  if (response.statusCode === 401) {
    ctx.res.writeHead(401, { 'Content-Type': 'application/json' })
    ctx.res.end('{"message":"Unauthorized"}')
  } else {
    ctx.user = response.body
  }
}

exports.justAuthenticate = async (ctx) => {
  const response = await request(ctx.req)
  ctx.user = response.body
}

function request(req) {
  return rp({
    uri: config.uaaUri,
    headers: { 'Authorization': req.headers['authorization'] },
    json: true
  })
}
