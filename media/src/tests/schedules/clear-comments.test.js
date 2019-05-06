const Koa = require('koa')

const { clearComments } = require('../../schedules/clear-comments')
const Comment = require('../../models/Comment')

describe('Clear Comments Schedule', () => {
  before(async () => {
    const mockServer = new Koa()
    mockServer.use((ctx) => {
      switch(ctx.request.url) {
        case '/blog/articles/1':
          ctx.throw(404)
          break
        case '/blog/articles/2':
          ctx.status = 200
          break
        case '/profile/posts/1':
          ctx.throw(404)
          break
      }
    })
    mockServer.listen(4000)
  })
  beforeEach(async () => {
    await new Comment({
      text: '<p>Test text</p>',
      resourceType: 'article',
      resourceId: 1,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
    await new Comment({
      text: '<p>Test text</p>',
      resourceType: 'article',
      resourceId: 2,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
    await new Comment({
      text: '<p>Test text</p>',
      resourceType: 'post',
      resourceId: 1,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
  })
  afterEach(async () => await Comment.remove())
  it('clear comments', async () => {
    await clearComments({
      getInstancesByAppId() {
        return [{
          hostName: 'localhost',
          port: {
            $: 4000
          }
        }]
      }
    })
    const comments = await Comment.find()
    comments.length.should.eql(1)
    comments[0].resourceType.should.eql('article')
    comments[0].resourceId.should.eql(2)
  })
})
