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
  <a aria-label="Open menu" href="javascript:" role="button" tabindex="1">☰</a>
  <a aria-label="Close menu" href="javascript:" role="button" tabindex="-1"></a>
  <ol>
    {items}
  </ol>
</nav>
`, {
  items: null
})
