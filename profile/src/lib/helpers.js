const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.authenticate = async (ctx) => {
  const res = await rp({
    uri: config.uaaUri,
    headers: { 'Authorization': ctx.request.headers['authorization'] },
    json: true
  })
  if (res.statusCode === 401) {
    ctx.response.status(401).json({ message: 'Unauthorized' })
  } else {
    ctx.user = res.body
  }
}
