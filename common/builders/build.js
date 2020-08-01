import { serialize } from '@lcf.vs/dom-engine/lib/backend.js'
import nav from './nav.js'
import page from './page.js'
import partial from './partial.js'

export default function build ({
  lang = 'en',
  view: { ...view },
  xhr = false
}) {
  return serialize({
    ...(xhr && partial) || {
      ...page,
      nav
    },
    ...view,
    lang
  })
}
