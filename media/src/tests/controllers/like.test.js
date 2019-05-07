const helpers = require('../helpers')
const Like = require('../../models/Like')

describe('Likes API', () => {
  const testLike = {
    resourceType: 'test',
    resourceId: 1,
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => await Like.remove())
  describe('POST /likes', () => {
    it('creates a like', async () => {
      const res = await helpers.request.post({
        uri: 'likes',
        json: true,
        body: testLike,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.String()
      res.body.createdDate.should.be.a.String()
      res.body.resourceType.should.eql(testLike.resourceType)
      res.body.resourceId.should.eql(testLike.resourceId)
      res.body.userId.should.eql(testLike.userId)
    })
    it('creates an invalid like', async () => {
      const res = await helpers.request.post({
        uri: 'likes',
        json: true,
        body: {},
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('creates a like with invalid token', async () => {
      const res = await helpers.request.post({
        uri: 'likes',
        json: true,
        body: testLike,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      })
      res.statusCode.should.eql(500)
    })
    it('removes the like', async () => {
      await new Like(testLike).save()
      const res = await helpers.request.post({
        uri: 'likes',
        json: true,
        body: testLike,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      const likes = await Like.find()
      likes.length.should.eql(0)
    })
  })
  describe('GET /likes', () => {
    it('gets the likes', async () => {
      const like = await new Like(testLike).save()
      const res = await helpers.request.get({
        uri: `likes?resourceType=${like.resourceType}&resourceId=${like.resourceId}`,
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(like._id.toString())
      new Date(res.body[0].createdDate).should.eql(like.createdDate)
      res.body[0].resourceType.should.eql(like.resourceType)
      res.body[0].resourceId.should.eql(like.resourceId)
      res.body[0].userId.should.eql(like.userId)
    })
  })
})
