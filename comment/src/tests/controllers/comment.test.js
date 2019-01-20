const helpers = require('../helpers')
const Comment = require('../../models/Comment')

describe("Comments API", () => {
  const testComment = {
    text: '<p>Test text</p>',
    resourceType: 'test',
    resourceId: 1,
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  before(async () => {
    await helpers.before()
  })
  after(async () => {
    await helpers.after()
  })
  beforeEach(async () => {
    await Comment.remove()
  })
  describe("POST /comments", () => {
    it("creates a comment", async () => {
      const res = await helpers.request.post({
        uri: 'comments',
        json: true,
        body: testComment,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.Number()
      res.body.createdDate.should.be.a.String()
      res.body.text.should.eql(testComment.text)
      res.body.resourceType.should.eql(testComment.resourceType)
      res.body.resourceId.should.eql(testComment.resourceId)
      res.body.userId.should.eql(testComment.userId)
    })
    it("creates an invalid comment", async () => {
      const res = await helpers.request.post({
        uri: 'comments',
        json: true,
        body: {
          text: ''
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it("creates an invalid comment contains only spaces", async () => {
      const res = await helpers.request.post({
        uri: 'comments',
        json: true,
        body: {
          text: ' ',
          resourceType: ' ',
          resourceId: 1
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it("creates a comment with invalid token", async () => {
      const res = await helpers.request.post({
        uri: 'comments',
        json: true,
        body: testComment,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      })
      res.statusCode.should.eql(500)
    })
  })
  describe("PUT /comments", () => {
    it("updates a comment", async () => {
      const comment = await new Comment(testComment).save()
      comment.text = '<p>Edited text</p>'
      const res = await helpers.request.put({
        uri: 'comments',
        json: true,
        body: comment,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(comment._id)
      new Date(res.body.createdDate).should.eql(comment.createdDate)
      res.body.text.should.eql(comment.text)
      res.body.resourceType.should.eql(comment.resourceType)
      res.body.resourceId.should.eql(comment.resourceId)
      res.body.userId.should.eql(comment.userId)
    })
    it("updates a comment with invalid params", async () => {
      const comment = await new Comment(testComment).save()
      comment.text = ' '
      const res = await helpers.request.put({
        uri: 'comments',
        json: true,
        body: comment,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
  })
  describe("GET /comments/:resourceType/:resourceId", () => {
    it("gets the comments", async () => {
      const comment = await new Comment(testComment).save()
      const res = await helpers.request.get({
        uri: `comments/${comment.resourceType}/${comment.resourceId}`,
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(comment._id)
      new Date(res.body[0].createdDate).should.eql(comment.createdDate)
      res.body[0].text.should.eql(comment.text)
      res.body[0].resourceType.should.eql(comment.resourceType)
      res.body[0].resourceId.should.eql(comment.resourceId)
      res.body[0].userId.should.eql(comment.userId)
    })
  })
  describe("DELETE /comments/:commentId", () => {
    it("removes the comment", async () => {
      const comment = await new Comment(testComment).save()
      const res = await helpers.request.delete({
        uri: 'comments/' + comment._id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const comments = await Comment.find()
      comments.length.should.eql(0)
    })
  })
})
