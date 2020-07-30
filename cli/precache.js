import '../cwd.cjs'
import { resolve } from 'path'

const directory = resolve()

const defaults = {
  serviceworker: {
    in: 'public/sw.js',
    out: 'sw.min.js'
  },
  paths: [
    resolve('dist'),
    resolve('dist/assets/css/styles.min.css'),
    resolve('dist'),
    resolve('dist'),

  ]
}

export default function precache ({
  name = 'sw.min.js',
  paths = [
  ],
  pattern = '/**/*.{js,html,css,png,jpg,svg,gif,ico}'
}) {

}
