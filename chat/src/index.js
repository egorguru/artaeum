import app from './app'
import config from './lib/config-client'

config.then((c) => {
  app.listen(+c.get('server.port'), () => {
    console.log(`Server has been started on port ${c.get('server.port')}`)
  })
})
