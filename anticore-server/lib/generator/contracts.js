export default function contracts ({ current, entries, path }) {
  const line = `import '../../.${entries}${path}/defs/contract.js'
`
  return `${current.replace(line, '')}${line}`
}
