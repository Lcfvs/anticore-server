export default function config ({ contract, contents, data, js, ...body }) {
  return `export default ${JSON.stringify({
    ...body,
    contract: `${js}/contract.js`
  }, null, 2)}`
}
