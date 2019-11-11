const helpers = require('../helpers')
const Stats = require('../../models/Stats')

describe('Stats API', async () => {
  const testStats = {
    ip: '127.0.0.1',
    url: 'test',
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => await Stats.remove())
  describe('POST /stats', () => {
    it('creates stats', async () => {
      const res = await helpers.request.post({
        uri: 'stats',
        json: true,
        body: testStats
      })
      res.statusCode.should.eql(201)
      const createdStats = await Stats.findOne()
      createdStats._id.should.be.a.Object()
      createdStats.createdDate.should.be.a.Date()
      createdStats.ip.should.eql(testStats.ip)
      createdStats.url.should.eql(testStats.url)
      createdStats.userId.should.eql('unauthorized')
    })
    it('creates stats with auth user', async () => {
      const res = await helpers.request.post({
        uri: 'stats',
        json: true,
        body: testStats,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      const createdStats = await Stats.findOne()
      createdStats._id.should.be.a.Object()
      createdStats.createdDate.should.be.a.Date()
      createdStats.ip.should.eql(testStats.ip)
      createdStats.url.should.eql(testStats.url)
      createdStats.userId.should.eql('uuid-test')
    })
  })
  describe('GET /stats', () => {
    it('gets stats', async () => {
      const stats = await new Stats(testStats).save()
      const res = await helpers.request.get({
        uri: 'stats',
        json: true,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(stats._id.toString())
      new Date(res.body[0].createdDate).should.eql(stats.createdDate)
      res.body[0].ip.should.eql(stats.ip)
      res.body[0].url.should.eql(stats.url)
      res.body[0].userId.should.eql(stats.userId)
    })
    it('gets stats without auth', async () => {
      const res = await helpers.request.get({
        uri: 'stats',
        json: true
      })
      res.statusCode.should.eql(401)
    })
  })
})
