const http = require('http')

const eureka = require('./lib/eureka-client')
const config = require('./lib/config')
const app = require('./app')

app.baseContext.eureka = eureka

app.listen(config.port).then(() => {
  eureka.start()
  console.log(`Server has been started on port ${config.port}`)
})
