import passport from 'koa-passport'
import passportConfig from '../lib/passport-config'

passportConfig(passport)

export default passport.initialize()
