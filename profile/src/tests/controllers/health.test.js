const helpers = require('../helpers')

describe('Health API', () => {
  it('GET /health gets health status', async () => {
    const res = await helpers.request.get({
      uri: 'health',
      json: true
    })
    res.statusCode.should.eql(200)
    res.headers['content-type'].should.match(/application\/json/)
    res.body.should.eql({ status: 'UP' })
  })
})
