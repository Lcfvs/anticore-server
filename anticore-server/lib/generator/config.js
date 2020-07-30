function escape (str) {
  return str.replace('\'', '\\\'')
}

export default function config ({ contract, contents, data, defs, ...body }) {
  return `export default {
  title: '${escape(body.title)}',
  description: '${escape(body.description)}',
  uri: '${body.uri}',
  class: '${body.class}',
  contract: '${defs}/contract.js',
  styles: '${defs}/styles.css'
}
`
}
