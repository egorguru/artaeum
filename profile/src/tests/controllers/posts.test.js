const helpers = require('../helpers')
const { Post } = require('../../models')

describe('Categories API', () => {
  const testPost = {
    text: 'Test post',
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => await Post.destroy({ truncate: true }))
  describe('POST /posts', () => {
    it('creates a post', async () => {
      const res = await helpers.request.post({
        uri: 'posts',
        json: true,
        body: testPost,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body.id.should.be.a.Number()
      res.body.createdDate.should.be.a.String()
      res.body.text.should.eql(testPost.text)
    })
    it('creates a post with invalid token', async () => {
      const res = await helpers.request.post({
        uri: 'posts',
        json: true,
        body: testPost,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      })
      res.statusCode.should.eql(401)
    })
  })
  describe('GET /posts/:postId', () => {
    it('gets the post by id', async () => {
      const post = await Post.create(testPost)
      const res = await helpers.request.get({
        uri: 'posts/' + post.id,
        json: true
      })
      res.statusCode.should.eql(200)
      res.body.id.should.eql(post.id)
      new Date(res.body.createdDate).should.eql(post.createdDate)
      res.body.text.should.eql(post.text)
    })
  })
  describe('GET /posts', () => {
    it('gets the posts by user ID', async () => {
      const post = await Post.create(testPost)
      const res = await helpers.request.get({
        uri: 'posts?userId=' + post.userId,
        json: true
      })
      res.statusCode.should.eql(200)
      res.body[0].id.should.eql(post.id)
      new Date(res.body[0].createdDate).should.eql(post.createdDate)
      res.body[0].text.should.eql(post.text)
      res.body[0].userId.should.eql(post.userId)
    })
  })
  describe('DELETE /posts/:postId', () => {
    it('removes post', async () => {
      const post = await Post.create(testPost)
      const res = await helpers.request.delete({
        uri: 'posts/' + post.id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const posts = await Post.findAll()
      posts.length.should.eql(0)
    })
  })
})
