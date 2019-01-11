const Eureka = require('eureka-js-client').Eureka

const config = require('./config')

const hostName = config.hostName
const hostPort = config.hostPort

module.exports = new Eureka({
  instance: {
    app: 'statistics',
    instanceId: `${hostName}:statistics:${hostPort}`,
    hostName: hostName,
    ipAddr: '127.0.0.1',
    port: {
      '$': hostPort,
      '@enabled': true,
    },
    vipAddress: `${hostName}`,
    homePageUrl: `http://${hostName}:${hostPort}`,
    statusPageUrl: `http://${hostName}:${hostPort}/statistics/health`,
    healthCheckUrl: `http://${hostName}:${hostPort}/statistics/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    maxRetries: Number.MAX_VALUE,
    serviceUrls: {
      default: [config.eurekaUrl]
    },
    registerWithEureka: true,
    fetchRegistry: true
  }
})
