const { isMongoId, isLength, isBase64 } = require('validator')

const isNotEmpty = require('../validation/is-not-empty-string')

exports.create = (title, body, image, category) => (
  isNotEmpty(title) && isLength(title, { min: 3, max: 100 }) &&
  isNotEmpty(body) && isLength(body, { min: 10 }) &&
  isBase64(image) &&
  isNotEmpty(category) && isMongoId(category)
)

exports.update = (id, title, body, category) => (
  typeof id === 'number' &&
  isNotEmpty(title) && isLength(title, { min: 3, max: 100 }) &&
  isNotEmpty(body) && isLength(body, { min: 10 }) &&
  isNotEmpty(category) && isMongoId(category)
)

exports.image = (image) => image === undefined || isBase64(image)
