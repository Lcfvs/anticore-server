import main from '../../../../../common/templates/main.js'
import meta from '../../../../../common/templates/meta.js'
import site from '../../../../builders/site.js'
import config from './config.js'
import contents from './contents.js'

export default {
  meta: {
    ...meta,
    ...site,
    description: config.description,
    title: config.title
  },
  main: {
    ...main,
    class: config.class,
    contents: {
      ...contents,
      uri: ''
    },
    title: config.title
  }
}
