// Set Config
const config = require('../lib/config')

config.sequelize = {
  dialect: "sqlite",
  storage: ":memory:"
}
//

const http = require('http')

const app = require('../app')

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
  await new Promise((resolve) => {
    mockUaaServer = initMockServer().listen(5000, resolve)
  })
  config.uaaUri = 'http://localhost:5000/uaa'
  await app.listen(config.port)
})

after(async () => {
  mockUaaServer.close()
  await app.close()
})
