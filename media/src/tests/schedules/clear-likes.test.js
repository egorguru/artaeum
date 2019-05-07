const Koa = require('koa')

const { clearLikes } = require('../../schedules/clear-likes')
const Like = require('../../models/Like')

let mockServer

describe('Clear Likes Schedule', () => {
  before(async () => {
    const mockApp = new Koa()
    mockApp.use((ctx) => {
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
    mockServer = mockApp.listen(4000)
  })
  after(() => mockServer.close())
  beforeEach(async () => {
    await new Like({
      resourceType: 'article',
      resourceId: 1,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
    await new Like({
      resourceType: 'article',
      resourceId: 2,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
    await new Like({
      resourceType: 'post',
      resourceId: 1,
      userId: 'uuid-test',
      createdDate: Date.now()
    }).save()
  })
  afterEach(async () => await Like.remove())
  it('clear likes', async () => {
    await clearLikes({
      getInstancesByAppId() {
        return [{
          hostName: 'localhost',
          port: {
            $: 4000
          }
        }]
      }
    })
    const likes = await Like.find()
    likes.length.should.eql(1)
    likes[0].resourceType.should.eql('article')
    likes[0].resourceId.should.eql(2)
  })
})
