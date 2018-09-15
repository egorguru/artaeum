import configClient from './config-client'
import OAuth2Strategy from 'passport-oauth2'
import BearerStrategy from 'passport-http-bearer'
import rp from 'request-promise'

function initOAuth2Strategy(config) {
  return new OAuth2Strategy({
    authorizationURL: config.get('security.oauth2.client.authorizationURL'),
    tokenURL: config.get('security.oauth2.client.accessTokenUri'),
    clientID: config.get('security.oauth2.client.clientId'),
    clientSecret: config.get('security.oauth2.client.clientSecret')
  }, (accessToken, refreshToken, profile, cb) => {
    return rp({
      uri: config.get('security.oauth2.resource.user-info-uri'),
      headers: { 'Authorization': `Bearer ${accessToken}` },
      json: true
    }).then(data => cb(null, data))
  })
}

function initBearerStrategy(config) {
  return new BearerStrategy((token, done) => {
    rp({
      uri: config.get('security.oauth2.resource.user-info-uri'),
      headers: { 'Authorization' : `Bearer ${token}` },
      json: true
    }).then((data) => {
      done(null, data)
    }).catch((e) => {
      done(e)
    })
  })
}

export default (passport) => {
  configClient.then((config) => {
    passport.use(initOAuth2Strategy(config))
    passport.use(initBearerStrategy(config))
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
  })
}
