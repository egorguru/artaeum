module.exports = {
  port: process.env.PORT || 11000,
  mongoUri: process.env.MONGO_URI,
  uaaUri: process.env.OAUTH2_USER_INFO_URI || 'http://uaa:5000/uaa/account/current',
  storageUri: process.env.STORAGE_SERVICE_URI,
  storagePassword: process.env.STORAGE_SERVICE_PASSWORD,
  eureka: {
    hostName: process.env.HOSTNAME || 'blog',
    hostPort: process.env.HOSTPORT || 11000,
    eurekaUrl: [process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/']
  }
}
