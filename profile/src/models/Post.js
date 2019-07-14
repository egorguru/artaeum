const Sequelize = require('sequelize')

module.exports = (sequelize) =>
  sequelize.define('posts', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, { timestamps: false })
