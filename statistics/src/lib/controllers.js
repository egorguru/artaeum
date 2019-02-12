const Stats = require('../models/Stats')
const helpers = require('./helpers')

const stats = {
  async post(data) {
    let userId
    try {
      const user = await helpers.checkAuth(data.headers['authorization'])
      userId = user.name
    } catch(e) {
      userId = 'unauthorized'
    }
    const remoteAddress = data.remoteAddress
    const { url } = data.body
    await new Stats({
      ip: remoteAddress,
      url,
      userId,
      createdDate: Date.now()
    }).save()
    return { status: 201 }
  },
  async get(data) {
    try {
      const user = await helpers.checkAuth(data.headers['authorization'])
      if (user.authorities.find((val) => val.authority === 'admin')) {
        const stats = await Stats.find()
        return {
          status: 200,
          body: stats
        }
      } else {
        return { status: 401 }
      }
    } catch(e) {
      return { status: 401 }
    }
  },
  async delete(data) {
    try {
      const user = await helpers.checkAuth(data.headers['authorization'])
      if (user.authorities.find((val) => val.authority === 'admin')) {
        const { _id } = data.queryStringObject
        await Stats.deleteOne({ _id })
        return { status: 200 }
      } else {
        return { status: 401 }
      }
    } catch(e) {
      return { status: 401 }
    }
  }
}

module.exports = {
  health(data) {
    if (data.method === 'get') {
      return {
        status: 200,
        body: { status: 'UP' }
      }
    } else {
      return { status: 405 }
    }
  },
  stats(data) {
    const acceptableMethods = ['post', 'get', 'delete']
    if (acceptableMethods.includes(data.method)) {
      return stats[data.method](data)
    } else {
      return { status: 405 }
    }
  },
  notFound(data) {
    return {
      status: 404,
      body: { message: 'Not found' }
    }
  }
}
