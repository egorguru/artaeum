const { load } = require('cloud-config-client')

module.exports = load({
  application: 'comment',
  name: 'comment',
  endpoint: process.env.CONFIG_SERVICE_URI || 'http://config:8888',
  auth: {
    user: process.env.CONFIG_SERVICE_USER,
    pass: process.env.CONFIG_SERVICE_PASSWORD
  }
})
