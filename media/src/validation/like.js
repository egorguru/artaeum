const isNotEmpty = require('./is-not-empty-string')

exports.saveOrRemove = (resourceType, resourceId) => (
  isNotEmpty(resourceType) && typeof resourceId === 'number'
)
