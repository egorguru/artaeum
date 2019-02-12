module.exports = {
  port: process.env.PORT || 12000,
  mongoUri: process.env.MONGO_URI,
  hostName: process.env.HOSTNAME || 'statistics',
  hostPort: process.env.HOSTPORT || 12000,
  eurekaUrl: process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/',
  uaaUri: process.env.OAUTH2_USER_INFO_URI || 'http://uaa:5000/uaa/account/current'
}
