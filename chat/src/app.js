import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'

import passportConfig from './cloud/oauth2-client'
import eurekaClient from './cloud/eureka-client'
import testRoutes from './controllers/test'
import healthRoutes from './controllers/health'

eurekaClient.start()

const app = express()

app.use(passport.initialize())
passportConfig(passport)

app.use(bodyParser.json())

app.use(cors())

app.use(healthRoutes)

export default app
