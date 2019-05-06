const { isEmpty } = require('validator')

module.exports = (string) => (
  string !== undefined && string.trim() !== '' && !isEmpty(string)
)
