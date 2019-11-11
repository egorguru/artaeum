const http = require('http')
const { MongoMemoryServer } = require('mongodb-memory-server')

const config = require('../lib/config')
let app = require('../app')

const mongod = new MongoMemoryServer({
  autoStart: false
})

let mockUaaServer

function initMockServer() {
  return http.createServer((req, res) => {
    let status, body
    if (req.headers['authorization'] === 'Bearer valid-token') {
      body = {
        name: 'uuid-test',
        authorities: [{
            authority: 'admin'
        }],
      }
      status = 200
    } else {
      status = 401
    }
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(status)
    res.end(JSON.stringify(body))
  })
}

before(async () => {
  if (!mongod.isRunning) {
    await mongod.start()
  }
  config.mongoUri = await mongod.getConnectionString()
  await new Promise((resolve) => {
    mockUaaServer = initMockServer().listen(5000, resolve)
  })
  config.uaaUri = 'http://localhost:5000/uaa'
  app = app('src/routes')
  await app.start(config.port)
})

after(async () => {
  mockUaaServer.close()
  await app.stop()
  await mongod.stop()
})
