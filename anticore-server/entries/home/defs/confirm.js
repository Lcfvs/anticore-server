import { template } from '@lcf.vs/dom-engine/lib/backend.js'

export default template(`
<a href="{uri}" target="_self">Go to the new view</a></a>
`, {
  uri: null
})
