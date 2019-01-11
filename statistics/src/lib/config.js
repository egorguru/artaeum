module.exports = {
  port: process.env.PORT || 12000,
  mongoUri: process.env.MONGO_URI,
  hostName: process.env.HOSTNAME || 'statistics',
  hostPort: process.env.HOSTPORT || 12000,
  eurekaUrl: process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/'
}
