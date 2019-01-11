module.exports = {
  parseJsonToObject(s) {
    try {
      return JSON.parse(s)
    } catch (e) {
      return {}
    }
  }
}
