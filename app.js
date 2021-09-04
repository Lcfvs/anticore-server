import { resolve } from 'path'
import { cwd } from 'process'
import fastify from 'fastify'
import bodyHook from './hooks/body.js'
import xhrHook from './hooks/xhr.js'
import compressPlugin from './plugins/compress.js'
import multipartPlugin from './plugins/multipart.js'
import staticsPlugin from './plugins/statics.js'

export default ({
  app = {},
  compress = {},
  multipart = {
    attachFieldsToBody: true
  },
  statics = {
    prefix: '/assets/',
    root: resolve(cwd(), `src/assets`)
  }
} = {}) => {
  const instance = fastify(app)

  compressPlugin(instance, compress)
  staticsPlugin(instance, statics)
  multipartPlugin(instance, multipart)
  xhrHook(instance)
  bodyHook(instance)

  return instance
}
