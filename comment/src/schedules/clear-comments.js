const rp = require('request-promise')
const { CronJob } = require('cron')

const Comment = require('../models/Comment')

const resourceService = {
  post: 'profile',
  article: 'blog'
}

async function clearComments(eureka) {
  const gateway = eureka.getInstancesByAppId('gateway')[0]
  const comments = await Comment.find()
  for (const comment of comments) {
    try {
      await rp.get(
        processUri(gateway.hostName, gateway.port.$, comment.resourceType, comment.resourceId)
      )
    } catch(e) {
      if (e.statusCode === 404) {
        await Comment.findByIdAndDelete(comment._id)
      }
    }
  }
}

function processUri(host, port, resource, id) {
  return `http://${host}:${port}/${resourceService[resource]}/${resource}s/${id}`
}

module.exports = (eureka) => new CronJob('00 5 * * *', () => clearComments(eureka))

module.exports.clearComments = clearComments
