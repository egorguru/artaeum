const Eureka = require('eureka-js-client').Eureka

const config = require('./config')

const hostName = config.eureka.hostName
const hostPort = config.eureka.hostPort

module.exports = new Eureka({
  instance: {
    app: 'COMMENT',
    instanceId: `${hostName}:comment:${hostPort}`,
    hostName: hostName,
    ipAddr: '127.0.0.1',
    port: {
      '$': hostPort,
      '@enabled': true,
    },
    vipAddress: 'COMMENT',
    homePageUrl: `http://${hostName}:${hostPort}`,
    statusPageUrl: `http://${hostName}:${hostPort}/comment/health`,
    healthCheckUrl: `http://${hostName}:${hostPort}/comment/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    maxRetries: Number.MAX_VALUE,
    serviceUrls: {
      default: config.eureka.eurekaUrl
    },
    registerWithEureka: true,
    fetchRegistry: true
  }
})
