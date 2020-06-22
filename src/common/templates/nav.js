import { fragment } from '@lcf.vs/dom-engine'

export const item = fragment(`
<li>
  <a class="{class}" href="{uri}">{title}</a>
</li>
`, {
  class: null,
  title: null,
  uri: null
})

export default fragment(`
<nav>
  <ol>
    {items}
  </ol>
</nav>
`, {
  items: null
})
