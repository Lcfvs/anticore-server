export default function content ({ contents, data = {} }) {
  return `import { template } from '@lcf.vs/dom-engine/lib/backend.js'

export default template(\`${contents}\`, ${JSON.stringify(Object.entries(data)
  .reduce((data, [name, value]) => ({
    ...data,
    [name]: value === 'null' ? null : value
  }), {}))})
`
}
