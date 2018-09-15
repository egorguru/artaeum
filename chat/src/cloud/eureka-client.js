import Eureka from 'eureka-js-client'

export default new Eureka({
  instance: {
    app: 'chat',
    hostName: 'chat',
    ipAddr: '127.0.0.1',
    port: {
      '$': 8000,
      '@enabled': true,
    },
    vipAddress: 'chat:8000',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'registry',
    port: 8761,
    maxRetries: Number.MAX_VALUE,
    preferIpAddress: true,
    servicePath: '/eureka/apps/'
  }
})
