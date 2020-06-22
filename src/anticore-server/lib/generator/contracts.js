export default function contracts ({ current, uri }) {
  const line = `import '/${uri}/defs/contract.js'
`
  return `${current.replace(line, '')}${line}`
}
