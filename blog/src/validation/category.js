const { isMongoId, isLength } = require('validator')

const isNotEmpty = require('./is-not-empty-string')

exports.create = (name) => isNotEmpty(name) && isLength(name, { min: 1, max: 20 })

exports.update = (id, name) => (
  isNotEmpty(id) && isMongoId(id) &&
  isNotEmpty(name) && isLength(name, { min: 1, max: 20 })
)
