const rp = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false
})
const { CronJob } = require('cron')

const Like = require('../models/Like')
const config = require('../lib/config')

async function clearLikes(eureka) {
  const gateway = eureka.getInstancesByAppId('gateway')[0]
  const likes = await Like.find()
  for (const like of likes) {
    const response = await rp.get(
      processUri(gateway.hostName, gateway.port.$, like.resourceType, like.resourceId)
    )
    if (response.statusCode === 404) {
      await Like.findByIdAndDelete(like._id)
    }
  }
}

function processUri(host, port, resource, id) {
  return `http://${host}:${port}/${config.resourceServiceMap[resource]}/${resource}s/${id}`
}

module.exports = (eureka) => new CronJob('00 5 * * *', () => clearLikes(eureka))

module.exports.clearLikes = clearLikes
