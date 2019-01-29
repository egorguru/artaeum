const app = require('./app')
const config = require('./lib/config')

app.listen(config.port, () => {
  console.log(`Server has been started on port ${config.port}`)
})
