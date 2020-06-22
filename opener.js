import { exec } from 'child_process'
import { platform } from 'process'
import { port } from './env.js'
import server from './server.js'

const urls = {
  '::': 'http://localhost'
}

const commands = {
  darwin: 'open',
  default: 'xdg-open',
  win32: 'start'
}

server.then(server => {
  const { address } = server.address()
  const url = urls[address] || `https://${address}`
  const command = commands[platform] || commands.default

  exec(`${command} ${url}:${port}`)
})
