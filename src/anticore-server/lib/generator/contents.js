export default function content ({ contents, data = {} }) {
  return `import { fragment } from '@lcf.vs/dom-engine'

export default fragment(\`${contents}\`, ${JSON.stringify(Object.entries(data)
  .reduce((data, [name, value]) => ({
    ...data,
    [name]: value === 'null' ? null : value
  }), {}))})
`
}
