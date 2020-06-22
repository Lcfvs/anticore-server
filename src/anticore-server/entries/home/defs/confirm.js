import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<strong>View created: <a href="{uri}">{uri}</a></strong>
`, {
  uri: null
})
