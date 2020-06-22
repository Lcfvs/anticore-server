export default function contracts ({ current, entries, uri }) {
  const line = `import '../../.${entries}${uri}/defs/contract.js'
`
  return `${current.replace(line, '')}${line}`
}
