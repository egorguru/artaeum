const { load } = require('cloud-config-client')

module.exports = load({
  application: 'blog',
  name: 'blog',
  endpoint: 'http://config:8888',
  auth: {
    user: process.env.CONFIG_SERVICE_USER,
    pass: process.env.CONFIG_SERVICE_PASSWORD
  }
})
