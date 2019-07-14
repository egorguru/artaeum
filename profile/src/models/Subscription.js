const Sequelize = require('sequelize')

module.exports = (sequelize) =>
  sequelize.define('subscription', {
    profileId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'profile_id'
    },
    subscriberId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'subscriber_id'
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_date'
    }
  }, {
    timestamps: false,
    tableName: 'subscriptions'
  })
