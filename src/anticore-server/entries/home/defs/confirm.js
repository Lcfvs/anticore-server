import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<strong>View created, restart your server and go to <a href="{uri}">{uri}</a></strong>
`, {
  uri: null
})
