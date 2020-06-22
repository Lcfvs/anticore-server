import config from './config.js'
import view from './view.js'

export default ({ app, build }) => {
  app.get(config.uri, ({ xhr }, response) => {
    response.send(build({
      view: {
        ...view
      },
      xhr
    }))

    response.end()
  })
}
