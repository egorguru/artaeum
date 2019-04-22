const rp = require('request-promise')

const config = require('../lib/config')

const auth = Buffer.from(`storage:${config.storagePassword}`).toString('base64')

module.exports.save = (uri, image, name) => rp({
  method: 'POST',
  uri,
  headers: { 'Authorization': `Basic ${auth}` },
  formData: { image, name }
})

module.exports.delete = (uri, name) => rp({
  method: 'DELETE',
  uri: uri + name,
  headers: { 'Authorization': `Basic ${auth}` }
})
