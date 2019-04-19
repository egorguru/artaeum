const { isLength } = require('validator')

const isNotEmpty = require('./is-not-empty-string')

exports.create = (text, resourceType, resourceId) => (
  isNotEmpty(text) && isLength(text, { min: 3, max: 300 }) &&
  isNotEmpty(resourceType) &&
  typeof resourceId === 'number'
)

exports.update = (id, text) => (
  typeof id === 'number' &&
  isNotEmpty(text) && isLength(text, { min: 3, max: 300 })
)
