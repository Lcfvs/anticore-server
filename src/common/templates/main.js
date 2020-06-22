import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`<main class="{class}">
  <h1>{title}</h1>
  {contents}
</main>`, {
  class: null,
  contents: null,
  title: null
})
