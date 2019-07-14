module.exports = {
  port: process.env.PORT || 6000,
  storagePassword: process.env.STORAGE_SERVICE_PASSWORD,
  hostName: process.env.HOSTNAME || 'statistics',
  hostPort: process.env.HOSTPORT || 6000,
  eurekaUrl: process.env.EUREKA_URL || 'http://registry:8761/eureka/apps/',
  uaaUri: process.env.OAUTH2_USER_INFO_URI || 'http://uaa:5000/uaa/account/current',
  sequelize: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'artaeum',
    host: process.env.POSTGRES_URL,
    dialect: 'postgres'
  }
}
