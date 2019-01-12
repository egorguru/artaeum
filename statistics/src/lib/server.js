const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const config = require('./config')
const controllers = require('./controllers')
const helpers = require('./helpers')

class Server {

  constructor(http, router, controllers) {
    this.http = http
    this.router = router
    this.controllers = controllers
  }

  serve(req, res) {
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
    const queryStringObject = parsedUrl.query
    const method = req.method.toLowerCase()
    const headers = req.headers
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data) => {
      buffer += decoder.write(data)
    })
    req.on('end', async () => {
      buffer += decoder.end()
      let chosencontroller = typeof (this.router[trimmedPath]) !== 'undefined' ?
        this.router[trimmedPath] : this.controllers.notFound
      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        body: helpers.parseJsonToObject(buffer)
      }
      try {
        const result = await chosencontroller(data)
        this.processControllerResponse(res, result)
      } catch (e) {
        this.processControllerResponse(res, {
          status: 500,
          body: {
            error: 'Internal Server Error'
          }
        })
      }
    })
  }

  processControllerResponse(res, data) {
    const status = typeof (data.status) === 'number' ? data.status : 200
    const body = typeof (data.body) === 'object' ? data.body : {}
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(status)
    res.end(JSON.stringify(body))
  }

  init() {
    this.http
      .createServer(this.serve.bind(this))
      .listen(config.port, () => {
        console.log(`Server has been started on port ${config.port}`)
      })
  }
}

const router = {
  'statistics/health': controllers.health,
  'statistics/404': controllers.notFound
}

module.exports = new Server(http, router, controllers)
