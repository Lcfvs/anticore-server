import config from './config.js'
import view from './view.js'

export default ({ app, build }) => {
  app.get(config.uri, (request, response) => {
    response.send(build({
      view: {
        ...view
      }
    }))

    response.end()
  })
}
