export default {
  disable (test) {
    return (request, response, next) => {
      if (test(request, response)) {
        response.set('Cache-Control', 'no-cache')
      }

      next()
    }
  },
  enable (test) {
    return (request, response, next) => {
      if (test(request, response)) {
        response.set('Cache-Control')
      }

      next()
    }
  }
}
