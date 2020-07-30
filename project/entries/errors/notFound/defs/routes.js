import view from './view.js'

export default ({ app, build }) => {
  app.use((request, response) => {
    response.status(404)

    response.send(build({
      view: {
        ...view
      }
    }))

    response.end()
  })
}
