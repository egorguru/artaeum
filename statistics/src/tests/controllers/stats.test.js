const helpers = require('../helpers')
const Stats = require('../../models/Stats')

describe('Stats API', async () => {
  const testStats = {
    ip: 'test',
    url: 'test',
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => {
    await Stats.remove()
  })
  describe('POST /stats', () => {
    it('creates an stats', async () => {
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
      createdStats.userId.should.eql(testStats.userId)
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
  describe('DELETE /stats?_id=:statsId', () => {
    it('removes stats', async () => {
      const stats = await new Stats(testStats).save()
      const res = await helpers.request.delete({
        uri: 'stats?_id=' + stats._id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const result = await Stats.find()
      result.length.should.eql(0)
    })
    it('removes stats without auth', async () => {
      const stats = await new Stats(testStats).save()
      const res = await helpers.request.delete({
        uri: 'stats?_id=' + stats._id
      })
      res.statusCode.should.eql(401);
      const result = await Stats.find()
      result.length.should.eql(1)
    })
  })
})
