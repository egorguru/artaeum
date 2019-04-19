const { isEmpty } = require('validator')

module.exports = (string) => !isEmpty(string, { ignore_whitespace: true })
