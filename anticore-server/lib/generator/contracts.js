export default function contracts ({ current, entries, resolved }) {
  const line = `import '../../../.${entries}${resolved}/defs/contract.js'
`
  return `${current.replace(line, '')}${line}`
}
