import { resolve } from 'path'
import { cwd, env } from 'process'
import fastify from 'fastify'
import bodyHook from './hooks/body.js'
import cspHook from './hooks/csp.js'
import xhrHook from './hooks/xhr.js'
import multipartPlugin from './plugins/multipart.js'
import staticsPlugin from './plugins/statics.js'

export default ({
  app = {
    logger: env.NODE_ENV !== 'production'
  },
  csp = [
    `default-src 'none'`,
    `connect-src 'self'`,
    `script-src 'self'`,
    `img-src 'self'`,
    `style-src 'self'`,
    `require-trusted-types-for 'script'`,
    `trusted-types anticore`
  ],
  multipart = {
    attachFieldsToBody: true
  },
  statics = {
    prefix: '/assets/',
    root: resolve(cwd(), `src/assets`)
  }
} = {}) => {
  const instance = fastify(app)

  staticsPlugin(instance, statics)
  multipartPlugin(instance, multipart)
  cspHook(instance, csp)
  xhrHook(instance)
  bodyHook(instance)

  return instance
}
