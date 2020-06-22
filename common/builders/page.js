import layout from '../templates/layout.js'
import site from '../../project/builders/site.js'
import scripts from '../../anticore-server/templates/scripts.js'
import styles from '../../anticore-server/templates/styles.js'
import { production } from '../../env.js'

export default {
  ...layout,
  ...site,
  ...production
    ? {}
    : {
      scripts,
      styles
    }
}
