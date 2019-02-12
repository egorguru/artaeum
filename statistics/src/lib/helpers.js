const rp = require('request-promise')

const config = require('./config')

module.exports = {
  parseJsonToObject(s) {
    try {
      return JSON.parse(s)
    } catch (e) {
      return {}
    }
  },
  async checkAuth(authorization) {
    return await rp({
      uri: config.uaaUri,
      headers: { 'Authorization': authorization },
      json: true
    })
  }
}
