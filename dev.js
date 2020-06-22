import process from 'process'
import { spawn } from 'child_process'
import webpack from 'webpack'
import EventEmitter from 'events'
import config from './webpack.config.js'

const compiler = webpack(config)
const emitter = new EventEmitter()

let child
let exited

function debug (error) {
  console.error(error)
  process.exit()
}

function handler (err, stats) {
  if (err || stats.hasErrors()) {
    return debug(err)
  }

  console.log(stats.toString({
    colors: true
  }))

  emitter.emit('compiled')
}

function run () {
  if (exited) {
    return
  }

  if (child) {
    child.kill()
    child = null
  }

  child = spawn('node', ['.'], {
    stdio: 'inherit'
  })

  child.unref()
  child.on('error', debug)
  child.once('close', run)
}

process.once('exit', () => (exited = true))
emitter.once('compiled', run)

if (config.mode === 'production') {
  compiler.run(handler)
} else {
  compiler.watch({}, handler)
}
