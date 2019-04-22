const app = require('./app')
const config = require('./lib/config')
const eureka = require('./lib/eureka-client')

app.context.eureka = eureka

app.listen(config.port, () => {
  eureka.start()
  console.log(`Server has been started on port ${config.port}`)
})
