const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.authenticate = async (ctx) => {
  const res = await request(ctx.request)
  if (res.statusCode === 401) {
    ctx.response.status(401).json({ message: 'Unauthorized' })
  } else {
    ctx.user = res.body
  }
}

exports.justAuthenticate = async (ctx) => {
  const res = await request(ctx.request)
  ctx.user = res.body
}

function request(req) {
  return rp({
    uri: config.uaaUri,
    headers: { 'Authorization': req.headers['authorization'] },
    json: true
  })
}
