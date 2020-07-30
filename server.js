import { FALLBACK, ORIGIN } from './env.js'
import express from 'express'
import { readFileSync } from 'fs'
import spdy from 'spdy'
import multer from 'multer'
import entries from './entries.js'
import build from './common/builders/build.js'
import cache from './common/cache/cache.js'
import errors from './project/entries/errors/errors.js'

const app = express()
const upload = multer()
const key = readFileSync('./certificates/localhost.key')
const cert = readFileSync('./certificates/localhost.crt')

app.use(upload.array())
app.use('/', express.static('project/public/dist'))
app.use('/', express.static('project/public/statics'))
app.use(cache.disable(request => request.url !== FALLBACK))
entries.forEach(({ routes }) => routes({ app, build, upload }))
errors(app, build)

spdy
  .createServer({ key, cert }, app)
  .listen(443, () => console.log(`Listening on ${ORIGIN}${FALLBACK}`))
