const helpers = require('../helpers')
const Article = require('../../models/Article')
const Category = require('../../models/Category')

describe('Articles API', async () => {
  const category = await new Category({
    name: 'Test category',
    userId: 'uuid-test',
    createdDate: Date.now()
  })
  const testArticle = {
    title: 'Test title',
    body: '<p>Test text</p>',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAFBQUFBVUFpkZFp9h3iHfbmqm5uquf/I18jXyP////////////////////////////////////////////////8BUFBQUFVQWmRkWn2HeId9uaqbm6q5/8jXyNfI///////////////////////////////////////////////////AABEIAAEAAQMBIgACEQEDEQH/xABLAAEBAAAAAAAAAAAAAAAAAAAABBABAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AtAB//9k=',
    userId: 'uuid-test',
    category: category._id,
    isPublished: true,
    createdDate: Date.now(),
    publishedDate: Date.now()
  }
  beforeEach(async () => {
    await Article.remove()
  })
  describe('POST /articles', () => {
    it('creates an article', async () => {
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: testArticle,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.Number()
      res.body.createdDate.should.be.a.String()
      res.body.title.should.eql(testArticle.title)
      res.body.body.should.eql(testArticle.body)
      res.body.userId.should.eql(testArticle.userId)
    })
    it('creates an article without category', async () => {
      const article = Object.assign({}, testArticle)
      delete article['category']
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: article,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.Number()
      res.body.createdDate.should.be.a.String()
      res.body.title.should.eql(article.title)
      res.body.body.should.eql(article.body)
      res.body.userId.should.eql(article.userId)
    })
    it('creates an invalid article', async () => {
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: {
          title: '',
          body: '',
          image: 'mock'
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('creates an invalid article contains only spaces', async () => {
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: {
          title: ' ',
          body: ' ',
          image: 'mock'
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('creates an article with invalid token', async () => {
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: testArticle,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      })
      res.statusCode.should.eql(500)
    })
    it('creates an article with wrong category', async () => {
      const res = await helpers.request.post({
        uri: 'articles',
        json: true,
        body: {
          title: 'Test',
          body: '<p>Test</p>',
          image: 'mock',
          category: 'wrongcategory'
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
  })
  describe('PUT /articles', () => {
    it('updates an article', async () => {
      const article = await new Article(testArticle).save()
      article.title = 'Edited title'
      article.body = '<p>Edited text</p>'
      const res = await helpers.request.put({
        uri: 'articles',
        json: true,
        body: article,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(article._id)
      new Date(res.body.createdDate).should.eql(article.createdDate)
      res.body.title.should.eql(article.title)
      res.body.body.should.eql(article.body)
      res.body.userId.should.eql(article.userId)
    })
    it('updates an article with invalid params', async () => {
      const article = await new Article(testArticle).save()
      article.title = ' '
      article.body = ' '
      const res = await helpers.request.put({
        uri: 'articles',
        json: true,
        body: article,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('updates an article with wrong category', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.put({
        uri: 'articles',
        json: true,
        body: {
          title: article.title,
          body: article.body,
          category: 'wrongcategory'
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('publishes an article', async () => {
      const article = await new Article({
        title: 'Test title',
        body: '<p>Test text</p>',
        image: 'mock',
        userId: 'uuid-test',
        createdDate: Date.now()
      }).save()
      const res = await helpers.request.put({
        uri: 'articles/publish',
        json: true,
        body: {
          _id: article._id
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.body.isPublished.should.eql(true)
      res.body.publishedDate.should.be.a.String()
    })
    it('changes status of article', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.put({
        uri: 'articles/status',
        json: true,
        body: {
          _id: article._id,
          isPublished: false
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.body.isPublished.should.eql(false)
    })
    it('changes status of never published article', async () => {
      const article = await new Article({
        title: 'Test title',
        body: '<p>Test text</p>',
        image: 'mock',
        userId: 'uuid-test',
        createdDate: Date.now()
      }).save()
      const res = await helpers.request.put({
        uri: 'articles/status',
        json: true,
        body: {
          _id: article._id,
          isPublished: true
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
  })
  describe('GET /articles/:articleId', () => {
    it('gets the article by id', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles/' + article._id,
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body._id.should.eql(article._id)
      new Date(res.body.createdDate).should.eql(article.createdDate)
      new Date(res.body.publishedDate).should.eql(article.publishedDate)
      res.body.title.should.eql(article.title)
      res.body.body.should.eql(article.body)
      res.body.userId.should.eql(article.userId)
    })
    it('gets my article by id', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles/my/' + article._id,
        json: true,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body._id.should.eql(article._id)
      new Date(res.body.createdDate).should.eql(article.createdDate)
      new Date(res.body.publishedDate).should.eql(article.publishedDate)
      res.body.title.should.eql(article.title)
      res.body.body.should.eql(article.body)
      res.body.userId.should.eql(article.userId)
    })
    it('gets no my article by id', async () => {
      const article = await new Article({
        title: 'Test title',
        body: '<p>Test text</p>',
        image: 'mock',
        userId: 'uuid-any',
        createdDate: Date.now()
      }).save()
      const res = await helpers.request.get({
        uri: 'articles/my/' + article._id,
        json: true,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(404)
    })
  })
  describe('GET /articles', () => {
    it('gets the articles', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles',
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
    })
    it('gets the articles with pagination', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles?page=0&size=1',
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
    })
    it('gets the articles by category', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles?category=' + article.category,
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
      res.body[0].category.should.eql(article.category.toString())
    })
    it('gets the only one article of two by category', async () => {
      const article = await new Article(testArticle).save()
      await new Article({
        title: 'mock',
        body: 'mock',
        userId: 'mock',
        createdDate: Date.now()
      }).save()
      const res = await helpers.request.get({
        uri: 'articles?category=' + article.category,
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      should(res.body.length).eql(1)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
      res.body[0].category.should.eql(article.category.toString())
    })
    it('gets my articles', async () => {
      const article = await new Article(testArticle).save()
      await new Article({
        title: 'mock',
        body: 'mock',
        userId: 'mock',
        createdDate: Date.now()
      }).save()
      const res = await helpers.request.get({
        uri: 'articles/my',
        json: true,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      should(res.body.length).eql(1)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
      res.body[0].category.should.eql(article.category.toString())
    })
    it('gets my articles with pagination', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles/my?page=0&size=1',
        json: true,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
    })
  })
  describe('GET /articles/search', () => {
    it('search for article', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles/search?query=tItle',
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
    })
    it('search for articles with pagination', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.get({
        uri: 'articles/search?query=tItle&page=0&size=1',
        json: true
      })
      res.statusCode.should.eql(200)
      res.headers['content-type'].should.match(/application\/json/)
      res.body[0]._id.should.eql(article._id)
      new Date(res.body[0].createdDate).should.eql(article.createdDate)
      new Date(res.body[0].publishedDate).should.eql(article.publishedDate)
      res.body[0].title.should.eql(article.title)
      res.body[0].userId.should.eql(article.userId)
    })
  })
  describe('DELETE /articles/:articleId', () => {
    it('removes article', async () => {
      const article = await new Article(testArticle).save()
      const res = await helpers.request.delete({
        uri: 'articles/' + article._id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const articles = await Article.find()
      articles.length.should.eql(0)
    })
  })
})
