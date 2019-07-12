const Sequelize = require('sequelize')

const { sequelize } = require('./config')

module.exports = new Sequelize(sequelize)
