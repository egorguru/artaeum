const Eureka = require('eureka-js-client').Eureka

const hostName = process.env.HOSTNAME || 'blog'
const hostPort = process.env.HOSTPORT || 9000

module.exports = new Eureka({
  instance: {
    app: 'blog',
    hostName: hostName,
    ipAddr: '127.0.0.1',
    port: {
      '$': hostPort,
      '@enabled': true,
    },
    vipAddress: `${hostName}:${hostPort}`,
    healthCheckUrl: `http://${hostName}:${hostPort}/comment/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    maxRetries: Number.MAX_VALUE,
    serviceUrls: {
      default: [process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/']
    }
  }
})
