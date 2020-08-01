import { readFileSync, statSync } from 'fs'
import glob from 'glob'
import { parse } from 'path'

const defaults = {
  cert: './certificates/**.crt',
  key: './certificates/**.key'
}

const reduce = (value, reducer) => reducer(value)

const reducers = [
  pattern => glob.sync(pattern),
  paths => paths.map(path => ({ path, mtime: statSync(path) })),
  files => files.sort(({ mtime: a }, { mtime: b }) => b - a),
  files => files[0],
  ({ path }) => ({ ...parse(path), path })
]

export function certificates ({
  cert = defaults.cert,
  key = defaults.key
} = {}) {
  const files = {
    cert: reducers.reduce(reduce, cert),
    key: reducers.reduce(reduce, key)
  }

  return {
    cert: readFileSync(files.cert.path),
    key: readFileSync(files.key.path)
  }
}
