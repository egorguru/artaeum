const http = require('http')

const eureka = require('./lib/eureka-client')
const config = require('./lib/config')
const app = require('./app')

eureka.start()

app.addHandlerBefore((ctx) => ctx.eureka = eureka)

http.createServer(app.toListener()).listen(config.port, () => {
  console.log(`Server has been started on port ${config.port}`)
})
