module.exports = {
  port: process.env.PORT || 7000,
  mongoUri: process.env.MONGO_URI,
  uaaUri: process.env.OAUTH2_USER_INFO_URI || 'http://uaa:5000/uaa/account/current',
  storagePassword: process.env.STORAGE_SERVICE_PASSWORD,
  eureka: {
    hostName: process.env.HOSTNAME || 'media',
    hostPort: process.env.HOSTPORT || 7000,
    eurekaUrl: [process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/']
  }
}
