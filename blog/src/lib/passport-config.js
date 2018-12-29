const BearerStrategy = require('passport-http-bearer')
const rp = require('request-promise')

function initBearerStrategy() {
  return new BearerStrategy((token, done) => {
    rp({
      uri: process.env.OAUTH2_USER_INFO_URI || 'http://uaa:5000/uaa/account/current',
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
