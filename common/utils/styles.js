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

export default function styles (path, strict = false) {
  if (!cache.has(path)) {
    cache.set(path, new Proxy(process(path), {
      get (target, name) {
        let { [name]: value = null } = target

        if (value === null) {
          if (strict) {
            throw new ReferenceError(`Unknown class: ${name}`)
          }

          value = name
        }

        return value
      }
    }))
  }

  return cache.get(path)
}
