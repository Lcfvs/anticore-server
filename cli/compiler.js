import EventEmitter from 'events'
import webpack from 'webpack'
import config from '../webpack.config.js'

const compiler = webpack(config)
const emitter = new EventEmitter()

function handler (err, stats) {
  if (err || stats.hasErrors()) {
    return emitter.emit('error', err || stats.toString({
      // Add console colors
      colors: true
    }))
  }

  emitter.emit('compiled', stats.toString({
    colors: true
  }))
}

if (config.mode === 'production') {
  compiler.run(handler)
} else {
  compiler.watch({}, handler)
}

export default emitter
