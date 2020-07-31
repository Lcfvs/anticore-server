import { promises } from 'fs'
import { basename } from 'path'
import config from './config.js'
import contents from './contents.js'
import contract from './contract.js'
import contracts from './contracts.js'
import module from './module.js'
import root from './root.js'
import routes from './routes.js'
import style from './style.js'
import styles from './styles.js'
import view from './view.js'

function parsePath ({ uri, ...body }) {
  return {
    ...body,
    uri,
    path: uri.split('/')
      .map(segment => segment.split('-').map((word, key) => key
        ? `${word[0].toUpperCase()}${word.slice(1)}`
        : word).join(''))
      .join('/')
  }
}

export default {
  async generate (body) {
    const { path } = parsePath(body)
    const resolved = path === '/' ? '/home' : path
    const project = './project'
    const assets = `${project}/public/assets`
    const js = `${assets}/js`
    const css = `${assets}/css`
    const entries = `${project}/entries`
    const directory = `${entries}${resolved}`
    const defs = `${directory}/defs`
    const name = basename(directory)
    const filename = `${directory}/${name}.js`

    await promises.mkdir(defs, { recursive: true })
    await promises.writeFile(`${defs}/config.js`, config({ ...body, defs }))
    await promises.writeFile(`${defs}/contract.js`, contract(body))
    await promises.writeFile(`${defs}/styles.css`, style(body))
    await promises.writeFile(`${defs}/contents.js`, contents(body))
    await promises.writeFile(`${defs}/routes.js`, routes(body))
    await promises.writeFile(`${defs}/view.js`, view(body))
    await promises.writeFile(`${filename}`, module(body))
    await promises.writeFile(`${project}/root.js`, root({
      name,
      resolved,
      current: (await promises.readFile(`${project}/root.js`)).toString()
    }))
    await promises.writeFile(`${js}/contracts.js`, contracts({
      entries,
      resolved,
      current: (await promises.readFile(`${js}/contracts.js`)).toString()
    }))
    await promises.writeFile(`${css}/styles.css`, styles({
      entries,
      resolved,
      current: (await promises.readFile(`${css}/styles.css`)).toString()
    }))
  }
}
