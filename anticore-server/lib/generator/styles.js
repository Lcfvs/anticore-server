export default function styles ({ current, entries, resolved }) {
  const line = `@import "../../../.${entries}${resolved}/defs/styles.css";
`
  return `${current.replace(line, '')}${line}`
}
