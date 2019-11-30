const eureka = require('./lib/eureka-client')
const config = require('./lib/config')
const { CONTEXT, START } = require('./app')

CONTEXT({ eureka })

START(config.port, () => {
  eureka.start()
  console.log(`Server has been started on port ${config.port}`)
})
