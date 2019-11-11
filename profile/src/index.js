const eureka = require('./lib/eureka-client')
const config = require('./lib/config')
const app = require('./app')

app.context('eureka', eureka)

app.start(config.port).then(() => {
  eureka.start()
  console.log(`Server has been started on port ${config.port}`)
})
