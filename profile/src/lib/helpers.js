const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})

const config = require('./config')

exports.checkAuth = (authorization) => {
  const response = await rp({
    uri: config.uaaUri,
    headers: { 'Authorization': authorization },
    json: true
  })
  return response.statusCode === 401 ? false : response.body
}
