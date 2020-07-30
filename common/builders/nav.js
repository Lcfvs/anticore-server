import nav, { item } from '../templates/nav.js'
import entries from '../../entries.js'

export default {
  ...nav,
  items: entries.map(({ config }) => {
    if (config.nav !== false) {
      return {
        ...item,
        class: config.class,
        title: config.title,
        uri: config.uri
      }
    }
  }).filter(Boolean)
}
