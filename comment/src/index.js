const app = require('./app')
const config = require('./lib/config')
const eureka = require('./lib/eureka-client')
const schedules = require('./schedules')

app.context.eureka = eureka

schedules.forEach((schedule) => schedule(eureka).start())

app.listen(config.port, () => {
  eureka.start()
  console.log(`Server has been started on port ${config.port}`)
})
