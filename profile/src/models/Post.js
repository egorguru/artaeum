const Sequelize = require('sequelize')

module.exports = (sequelize) =>
  sequelize.define('post', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'user_id'
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'text'
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_date'
    }
  }, {
    timestamps: false,
    tableName: 'posts'
  })
