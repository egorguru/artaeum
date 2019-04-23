const { MongoMemoryServer } = require('mongodb-memory-server')
const Koa = require('koa')

const config = require('../lib/config')

const mongod = new MongoMemoryServer({
  autoStart: false
})

let mockUaaStorageServer
let server

function initMockServer() {
  const mockServer = new Koa()
  mockServer.use((ctx) => {
    if (ctx.request.url.includes('uaa')) {
      if (ctx.request.headers['authorization'] === 'Bearer valid-token') {
        ctx.body = {
          name: 'uuid-test'
        }
        ctx.status = 200
      } else {
        ctx.status = 401
      }
    } else {
      ctx.status = 200
    }
  })
  return mockServer
}

before(async () => {
  if (!mongod.isRunning) {
    await mongod.start()
  }
  config.mongoUri = await mongod.getConnectionString()
  await new Promise((resolve, reject) => {
    mockUaaStorageServer = initMockServer().listen(5000, resolve)
  })
  config.storageUri = 'http://localhost:5000/storage'
  config.uaaUri = 'http://localhost:5000/uaa'
  await new Promise((resolve, reject) => {
    const app = require('../app')
    // Mock Eureka Client
    app.context.eureka = {
      getInstancesByAppId() {
        return [{
          hostName: 'localhost',
          port: {
            $: 5000
          }
        }]
      }
    }
    server = app.listen(config.port, resolve)
  })
})

after(async () => {
  server.close()
  mockUaaStorageServer.close()
  await mongod.stop()
})
