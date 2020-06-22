import { promises } from 'fs'
import { basename } from 'path'
import config from './config.js'
import contents from './contents.js'
import contract from './contract.js'
import contracts from './contracts.js'
import module from './module.js'
import root from './root.js'
import routes from './routes.js'
import view from './view.js'

export default {
  async generate (body) {
    const { uri } = body
    const project = `./project`
    const assets = `${project}/assets`
    const js = `${assets}/js`
    const entries = `${project}/entries`
    const directory = `${entries}/${uri}`
    const defs = `${directory}/defs`
    const name = basename(directory)
    const filename = `${directory}/${name}.js`

    await promises.mkdir(defs, { recursive: true })
    await promises.writeFile(`${defs}/config.js`, config({ ...body, js }))
    await promises.writeFile(`${defs}/contract.js`, contract(body))
    await promises.writeFile(`${defs}/contents.js`, contents(body))
    await promises.writeFile(`${defs}/routes.js`, routes(body))
    await promises.writeFile(`${defs}/view.js`, view(body))
    await promises.writeFile(`${filename}`, module(body))
    await promises.writeFile(`${project}/root.js`, root({
      name,
      uri,
      current: (await promises.readFile(`${project}/root.js`)).toString()
    }))
    await promises.writeFile(`${js}/contracts.js`, contracts({
      defs,
      uri,
      current: (await promises.readFile(`${js}/contracts.js`)).toString()
    }))
  }
}
