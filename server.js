import compression from 'compression'
import express from 'express'
import { readFileSync } from 'fs'
import helmet from 'helmet'
import multer from 'multer'
import spdy from 'spdy'
import build from './common/builders/build.js'
import cache from './common/cache/cache.js'
import entries from './entries.js'
import { FALLBACK, ORIGIN, PORT } from './env.js'
import errors from './project/entries/errors/errors.js'

const app = express()
const upload = multer()
const key = readFileSync('./certificates/localhost.key')
const cert = readFileSync('./certificates/localhost.crt')

app.use(helmet())
app.use(compression())
app.use(upload.array())
app.use('/', express.static('project/public/dist'))
app.use('/', express.static('project/public/statics'))
app.use(cache.disable(request => request.url !== FALLBACK))
entries.forEach(({ routes }) => routes({ app, build, upload }))
errors(app, build)

spdy
  .createServer({ key, cert }, app)
  .listen(PORT, () => console.log(`Listening on ${ORIGIN}:${PORT}${FALLBACK}`))
