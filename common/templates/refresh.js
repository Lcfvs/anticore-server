import { template } from '@lcf.vs/dom-engine/lib/backend.js'

export default template(`
<meta http-equiv="refresh" content="{delay};URL={url}"> 
`, {
  delay: null,
  url: null
})
