import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<meta http-equiv="refresh" content="{delay};URL={url}"> 
`, {
  delay: null,
  url: null
})
