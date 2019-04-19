const { isMongoId, isLength, isBase64 } = require('validator')

exports.create = (title, body, image, category) => (
  isLength(title, { min: 3, max: 100 }) &&
  isLength(body, { min: 10 }) &&
  isBase64(image) &&
  isMongoId(category)
)

exports.update = (id, title, body, category) => (
  typeof id === 'number' &&
  isLength(title, { min: 3, max: 100 }) &&
  isLength(body, { min: 10 }) &&
  isMongoId(category)
)

exports.image = (image) => image === undefined || isBase64(image)
