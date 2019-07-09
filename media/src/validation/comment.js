const { isLength, isNumeric, isMongoId } = require('validator')

const isNotEmpty = require('./is-not-empty-string')

exports.get = (resourceType, resourceId) => (
  isNotEmpty(resourceType) && resourceId !== undefined
)

exports.create = (text, resourceType, resourceId) => (
  isNotEmpty(text) && isLength(text, { min: 3, max: 300 }) &&
  isNotEmpty(resourceType) &&
  resourceId !== undefined
)

exports.update = (id, text) => (
  isMongoId(id) &&
  isNotEmpty(text) && isLength(text, { min: 3, max: 300 })
)
