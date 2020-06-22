export default function module () {
  return `import './defs/routes.js'
import config from './defs/config.js'
import contents from './defs/contents.js'
import * as contract from './defs/contract.js'
import routes from './defs/routes.js'
import view from './defs/view.js'

export default {
  config,
  contents,
  contract,
  routes,
  view
}
`
}
