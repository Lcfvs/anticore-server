import { spawn } from 'child_process'
import process from 'process'

let child
let exited

function debug (error) {
  console.error(error)
  process.exit()
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

export default function launcher (compiler) {
  compiler.once('compiled', run)
  compiler.once('error', error => console.error(error))
}
