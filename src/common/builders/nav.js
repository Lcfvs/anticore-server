import nav, { item } from '../templates/nav.js'
import entries from '../../entries.js'

export default {
  ...nav,
  items: entries.map(({ config }) => ({
    ...item,
    class: config.class,
    title: config.title,
    uri: config.uri
  }))
}
