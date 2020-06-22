import generator from '../../../lib/generator/generator.js'
import config from './config.js'
import confirm from './confirm.js'
import view from './view.js'

export default ({ app, build }) => {
  app.get(config.action, ({ xhr }, response) => {
    response.send(build({
      view: {
        ...view
      },
      xhr
    }))

    response.end()
  })

  app.post(config.action, async ({ body, xhr }, response) => {
    await generator.generate(body)

    response.send(build({
      view: {
        ...view,
        ...body,
        main: {
          ...view.main,
          contents: {
            ...view.main.contents,
            confirm: {
              ...confirm,
              uri: body.uri
            }
          }
        }
      },
      xhr
    }))

    response.once('close', () => process.exit())
    response.end()
  })
}
