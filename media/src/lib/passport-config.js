const BearerStrategy = require('passport-http-bearer')
const rp = require('request-promise')

const config = require('./config')

function initBearerStrategy() {
  return new BearerStrategy((token, done) => {
    rp({
      uri: config.uaaUri,
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
  passport.use(initBearerStrategy())
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
}
