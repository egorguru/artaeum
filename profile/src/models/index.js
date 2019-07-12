const sequelize = require('../lib/sequelize')
const post = require('./Post')
const subscription = require('./Subscription')

const Post = post(sequelize)
const Subscription = subscription(sequelize)

Post.sync()
Subscription.sync()

module.exports = { Post, Subscription }
