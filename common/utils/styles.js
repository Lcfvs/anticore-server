import { readFileSync } from 'fs'
import postcss from 'postcss'
import modules from 'postcss-modules-sync'

const cache = new Map()

function process (path) {
  let pairs = {}

  return postcss([modules.default({
    getJSON: tokens => (pairs = tokens)
  })]).process(readFileSync(path)).css &&
  Object.keys(pairs).reduce(reduce, {})
}

function reduce (classes, key) {
  return {
    ...classes,
    [key]: key
  }
}

export default function styles (path) {
  if (!cache.has(path)) {
    cache.set(path, new Proxy(process(path), {
      get (target, name) {
        const { [name]: value = null } = target

        if (value === null) {
          throw new ReferenceError(`Unknown class: ${name}`)
        }

        return value
      }
    }))
  }

  return cache.get(path)
}
