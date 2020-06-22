import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<strong>View created, restart your server then <a href="{uri}">click here</a></strong>
`, {
  uri: null
})
