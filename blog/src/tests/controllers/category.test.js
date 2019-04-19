const helpers = require('../helpers')
const Category = require('../../models/Category')
const Article = require('../../models/Article.js')

describe('Categories API', () => {
  const testCategory = {
    name: 'Test category',
    userId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => {
    await Category.remove()
  })
  describe('POST /categories', () => {
    it('creates a category', async () => {
      const res = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: testCategory,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.String()
      res.body.createdDate.should.be.a.String()
      res.body.name.should.eql(testCategory.name)
    })
    it('creates a invalid comment with blank name', async () => {
      const res = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: {
          name: ''
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('creates a invalid category contains only spaces', async () => {
      const res = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: {
          name: ' '
        },
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
    })
    it('creates a category with invalid token', async () => {
      const res = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: testCategory,
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      })
      res.statusCode.should.eql(500)
    })
    it('creates two identical categories', async () => {
      const firstCreate = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: testCategory,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      firstCreate.statusCode.should.eql(201)
      const secondCreate = await helpers.request.post({
        uri: 'categories',
        json: true,
        body: testCategory,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      secondCreate.statusCode.should.eql(400)
      secondCreate.body.error.should.eql('Category already exists')
    })
  })
  describe('PUT /categories', () => {
    it('updates a category', async () => {
      const category = await new Category(testCategory).save()
      category.name = 'Edited name'
      const res = await helpers.request.put({
        uri: 'categories',
        json: true,
        body: category,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(category._id.toString())
      new Date(res.body.createdDate).should.eql(category.createdDate)
      res.body.name.should.eql(category.name)
    })
    it('updates the category with the same name', async () => {
      const category = await new Category(testCategory).save()
      category.name = category.name
      const res = await helpers.request.put({
        uri: 'categories',
        json: true,
        body: category,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('Category already exists')
    })
  })
  describe('GET /categories/:categoryId', () => {
    it('gets the category by id', async () => {
      const category = await new Category(testCategory).save()
      const res = await helpers.request.get({
        uri: 'categories/' + category._id,
        json: true
      })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(category._id.toString())
      new Date(res.body.createdDate).should.eql(category.createdDate)
      res.body.name.should.eql(category.name)
    })
  })
  describe('GET /categories', () => {
    it('gets the categories by user ID', async () => {
      const category = await new Category(testCategory).save()
      const res = await helpers.request.get({
        uri: 'categories?userId=' + category.userId,
        json: true
      })
      res.statusCode.should.eql(200)
      res.body[0]._id.should.eql(category._id.toString())
      new Date(res.body[0].createdDate).should.eql(category.createdDate)
      res.body[0].name.should.eql(category.name)
      res.body[0].userId.should.eql(category.userId)
    })
  })
  describe('DELETE /categories/:categoryId', () => {
    it('removes category', async () => {
      const category = await new Category(testCategory).save()
      const res = await helpers.request.delete({
        uri: 'categories/' + category._id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const categories = await Category.find()
      categories.length.should.eql(0)
    })
    it('removes category and clears articles', async () => {
      const category = await new Category(testCategory).save()
      const article = await new Article({
        title: 'Test title',
        body: '<p>Test text</p>',
        userId: 'uuid-test',
        createdDate: Date.now(),
        category: category._id
      }).save()
      article.category.should.eql(category._id)
      const res = await helpers.request.delete({
        uri: 'categories/' + category._id,
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      })
      res.statusCode.should.eql(200);
      const categories = await Category.find()
      categories.length.should.eql(0)
      const clearedArticle = await Article.findById(article._id)
      should(clearedArticle.category).be.Undefined()
    })
  })
})
