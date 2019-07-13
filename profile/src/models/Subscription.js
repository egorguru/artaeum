const Sequelize = require('sequelize')

module.exports = (sequelize) =>
  sequelize.define('subscriptions', {
    profileId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subscriberId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  })
