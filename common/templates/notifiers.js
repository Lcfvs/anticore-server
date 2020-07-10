import { template } from '@lcf.vs/dom-engine/lib/backend.js'

export default template(`
<ol>
  {items}
</ol>
`, {
  items: null
})
