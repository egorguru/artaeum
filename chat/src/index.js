const app = require('./app')
const config = require('./lib/config-client')

config.then((c) => {
  const port = process.env[c.get('server.port')] || 8000
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
  })
})
