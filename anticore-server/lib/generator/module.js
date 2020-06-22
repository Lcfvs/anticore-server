export default function module () {
  return `import config from './defs/config.js'
import contents from './defs/contents.js'
import routes from './defs/routes.js'
import view from './defs/view.js'

export default {
  config,
  contents,
  routes,
  view
}
`
}
