module.exports = {
  health(data) {
    if (data.method === 'get') {
      return {
        status: 200,
        body: { status: 'UP' }
      }
    } else {
      return { status: 405 }
    }
  },
  notFound(data) {
    return {
      status: 404,
      body: { message: 'Not found' }
    }
  }
}
