import view from './view.js'

export default ({ app, build }) => {
  app.use((error, request, response, next) => {
    if (!error) {
      return next()
    }

    response.status(500)

    response.send(build({
      view: {
        ...view
      }
    }))

    response.end()
  })
}
