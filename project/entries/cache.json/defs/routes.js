import { readFileSync } from 'fs'
import config from './config.js'
import view from './view.js'

const { version } = JSON.parse(readFileSync('package.json').toString())

export default ({ app }) => {
  app.get(config.uri, ({ xhr }, response) => {
    response.set('etag', version)
    response.send(view)
    response.end()
  })
}
