const rp = require('request-promise')

const uri = process.env.STORAGE_SERVICE_URI | 'http://storage:10000/storage/images/blog/'
const auth = Buffer.from(`storage:${process.env.STORAGE_SERVICE_PASSWORD}`).toString('base64')

module.exports.save = (image, name) => rp({
  method: 'POST',
  uri,
  headers: { 'Authorization': `Basic ${auth}` },
  formData: { image, name }
})

module.exports.delete = (name) => rp({
  method: 'DELETE',
  uri: uri + name,
  headers: { 'Authorization': `Basic ${auth}` }
})
