const rp = require('request-promise')

const config = require('../lib/config')

const auth = Buffer.from(`storage:${config.storagePassword}`).toString('base64')

module.exports.save = (uri, file, name) => rp({
  uri,
  method: 'POST',
  headers: { 'Authorization': `Basic ${auth}` },
  body: { file, name },
  json: true
})

module.exports.delete = (uri, name) => rp({
  method: 'DELETE',
  uri: uri + name,
  headers: { 'Authorization': `Basic ${auth}` }
})
