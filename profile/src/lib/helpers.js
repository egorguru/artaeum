const { json } = require('dragonrend')
const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.authenticate = async ctx => {
  const res = await rp({
    uri: config.uaaUri,
    headers: { 'Authorization': ctx.request.headers['authorization'] },
    json: true
  })
  if (res.statusCode === 401) {
    return json({
      status: 401,
      body: { message: 'Unauthorized' }
    })
  } else {
    ctx.user = res.body
  }
}
