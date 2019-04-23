const { isEmpty } = require('validator')

module.exports = (string) => typeof string === 'string' &&
  string.trim() !== '' && !isEmpty(string)
