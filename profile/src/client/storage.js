const rp = require('request-promise')

const config = require('../lib/config')

const auth = Buffer.from(`storage:${config.storagePassword}`).toString('base64')

exports.save = (eureka, file, name) => rp({
  uri: prepareUri(eureka),
  method: 'POST',
  headers: { 'Authorization': `Basic ${auth}` },
  body: { file, name },
  json: true
})

exports.delete = (eureka, name) => rp({
  method: 'DELETE',
  uri: prepareUri(eureka) + name + '.jpg',
  headers: { 'Authorization': `Basic ${auth}` }
})

function prepareUri(eureka) {
  const storageInstance = eureka.getInstancesByAppId('storage')[0]
  return `http://${storageInstance.hostName}:${storageInstance.port.$}/storage/images/profile/`
}
