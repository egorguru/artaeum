process.env.NODE_ENV = 'dev'

const rp = require('request-promise')
const http = require('http')
const MongoInstance = require('inmemory-mongo')

const Comment = require('../../models/Comment')
const { app, mongoInit } = require('../../app')

const mongoInstance = new MongoInstance()

const server = http.createServer(app)

describe('Comments API', () => {
  before((done) => {
    mongoInstance.start().then((config) => {
      mongoInit()
      server.listen(8000, done)
    })
  })
  describe('Get comments', () => {
    before(async () => {
      await new Comment({
        text: 'test text',
        resourceType: 'test',
        resourceId: 123,
        userId: 'uuid-123'
      }).save()
    })
    it('Get /comment/comments', async () => {
      const response = await rp({
        method: 'get',
        uri: 'http://localhost:8000/comment/comments',
        json: true
      })
      console.log(response)
      response.body[0].text.should.eql('test text')
      response.body[0].resourceType.should.eql('test')
      response.body[0].resourceId.should.eql(123)
      response.body[0].userId.should.eql('uuid-123')
      should.exist(response.body[0]._id)
    })
  })
  after((done) => {
    app.
    server.close(done())
  })
})
