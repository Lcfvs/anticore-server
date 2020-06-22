export default function root ({ current, name, path }) {
  const line = `export { default as ${name} } from './entries${path}/${name}.js'
`
  return `${current.replace(line, '')}${line}`
}
