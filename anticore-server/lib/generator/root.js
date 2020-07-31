export default function root ({ current, name, resolved }) {
  const line = `export { default as ${name} } from './entries${resolved}/${name}.js'
`
  return `${current.replace(line, '')}${line}`
}
