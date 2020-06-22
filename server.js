import express from 'express'
import multer from 'multer'
import entries from './entries.js'
import { port } from './env.js'
import build from './common/builders/build.js'

const app = express()
const upload = multer()

app.use(upload.array())
app.use('/assets', express.static('dist/assets'))

export default new Promise(resolve => {
  entries.forEach(({ routes }) => {
    routes({ app, build, upload })
  })

  const server = app.listen(port, () => resolve(server))
})
