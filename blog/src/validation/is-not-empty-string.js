const { isEmpty } = require('validator')

module.exports = (string) => string.trim() !== '' && !isEmpty(string)
