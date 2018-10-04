const app = require('./app')
const config = require('./lib/config-client')

config.then((c) => {
  app.listen(+c.get('server.port'), () => {
    console.log(`Server has been started on port ${c.get('server.port')}`)
  })
})
