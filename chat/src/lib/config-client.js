const { load } = require('cloud-config-client')

module.exports = load({
  application: 'chat',
  name: 'chat',
  endpoint: 'http://config:8888',
  auth: {
    user: process.env.CONFIG_SERVICE_USER,
    pass: process.env.CONFIG_SERVICE_PASSWORD
  }
})
