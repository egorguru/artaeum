const { routify, POST, GET } = require('dragonrend')

const Stats = require('../models/Stats')
const { authenticate, justAuthenticate } = require('../lib/helpers')

module.exports = routify({ prefix: '/stats' })([
  [POST, '/', justAuthenticate, async ({
    request: { body: { ip, url } },
    user: { name = 'unauthorized' } = {},
    response
  }) => {
    await new Stats({ ip, url, userId: name }).save()
    response.status(201).text('')
  }],
  [GET, '/', authenticate, async ({ user, response }) => {
    if (user.authorities.find((val) => val.authority === 'admin')) {
      response.json(await Stats.find())
    } else {
      response.status(403).text('')
    }
  }]
])
