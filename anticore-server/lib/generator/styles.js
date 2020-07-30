export default function styles ({ current, entries, path }) {
  const line = `@import "../../../.${entries}${path}/defs/styles.css";
`
  return `${current.replace(line, '')}${line}`
}
