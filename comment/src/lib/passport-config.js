const BearerStrategy = require('passport-http-bearer')
const rp = require('request-promise')

const config = require('./config-client')

function initBearerStrategy(config) {
  return new BearerStrategy((token, done) => {
    rp({
      uri: process.env[config.get('security.oauth2.resource.user-info-uri')] || 'http://uaa:5000/uaa/account/current',
      headers: { 'Authorization': `Bearer ${token}` },
      json: true
    }).then((data) => {
      done(null, data)
    }).catch((e) => {
      done(e)
    })
  })
}

module.exports = (passport) => {
  config.then((config) => {
    passport.use(initBearerStrategy(config))
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
  })
}
