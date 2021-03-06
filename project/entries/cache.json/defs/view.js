import glob from 'glob'
import '../../../../cwd.cjs'

const statics = 'project/public/statics'
const nodir = true

export default {
  fallback: '/fallback',
  main: '/assets/js/main.min.js',
  styles: '/assets/css/styles.min.css',
  statics: glob.sync(`${statics}/**`, { nodir })
    .map(pathname => pathname.slice(statics.length))
}
