const http = require('http')
const { MongoMemoryServer } = require('mongodb-memory-server')

const config = require('../lib/config')

const mongod = new MongoMemoryServer({
  autoStart: false
})

let mockUaaServer
let server

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
  await new Promise((resolve, reject) => {
    mockUaaServer = initMockServer().listen(5000, resolve)
  })
  config.uaaUri = 'http://localhost:5000/uaa'
  server = require('../index')
})

after(async () => {
  mockUaaServer.close()
  await mongod.stop()
})
