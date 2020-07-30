import internal from './internal/internal.js'
import notFound from './notFound/notFound.js'

export default function errors (app, build) {
  internal.routes({ app, build })
  notFound.routes({ app, build })
}
