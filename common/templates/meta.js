import { fragment } from '@lcf.vs/dom-engine'

export default fragment(`
<title>{title} - {branding}</title>
<meta name="description" content="{description}">
`, {
  branding: null,
  description: null,
  title: null
})
