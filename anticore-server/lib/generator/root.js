export default function root ({ current, name, uri }) {
  const line = `export { default as ${name} } from './entries${uri}/${name}.js'
`
  return `${current.replace(line, '')}${line}`
}
