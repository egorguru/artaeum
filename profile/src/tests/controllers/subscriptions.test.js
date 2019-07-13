const helpers = require('../helpers')
const { Subscription } = require('../../models')

describe('Subscription API', () => {
  const testSubscription = {
    profileId: 'uuid-1',
    subscriberId: 'uuid-test',
    createdDate: Date.now()
  }
  beforeEach(async () => await Subscription.destroy({ truncate: true }))
  describe('POST /subscriptions', () => {
    it('creates a subscription', async () => {
      const res = await helpers.request.post({
        uri: 'subscriptions',
        json: true,
        headers: { 'Authorization': 'Bearer valid-token' },
        body: { profileId: 'uuid-1' }
      })
      res.statusCode.should.eql(201)
      res.body.id.should.be.a.Number()
      res.body.createdDate.should.be.a.String()
      res.body.profileId.should.eql(testSubscription.profileId)
      res.body.subscriberId.should.eql(testSubscription.subscriberId)
    })
    it('creates a subscription with invalid token', async () => {
      const res = await helpers.request.post({
        uri: 'subscriptions',
        json: true,
        headers: { 'Authorization': 'Bearer invalid-token' },
        body: testSubscription,
      })
      res.statusCode.should.eql(401)
    })
  })
  describe('GET /subscriptions', () => {
    it('gets the subscriptions by profileId', async () => {
      const subscription = await Subscription.create(testSubscription)
      const res = await helpers.request.get({
        uri: 'subscriptions?profileId=' + subscription.profileId,
        json: true
      })
      res.statusCode.should.eql(200)
      res.body[0].id.should.eql(subscription.id)
      res.body[0].profileId.should.eql(testSubscription.profileId)
      res.body[0].subscriberId.should.eql(testSubscription.subscriberId)
    })
  })
  describe('DELETE /subscriptions', () => {
    it('removes subscription', async () => {
      await Subscription.create(testSubscription)
      const res = await helpers.request.delete({
        uri: 'subscriptions',
        headers: { 'Authorization': 'Bearer valid-token' },
        body: { profileId: 'uuid-1' },
        json: true
      })
      res.statusCode.should.eql(200);
      const subscriptions = await Subscription.findAll()
      subscriptions.length.should.eql(0)
    })
  })
})
