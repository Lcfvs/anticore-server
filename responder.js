import * as renderer from './renderer.js'
import { matches } from './hooks/xhr.js'

const html = 'text/html; charset=utf-8'

export const sse = ({
  error
}) => {
  const commons = { error }

  return reply => {
    const {
      raw
    } = reply

    raw.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    })

    return async (type, id, template, {
      data,
      errors = null
    } = {}) => {

      raw.write(`id: ${id}\n`)
      raw.write(`type: ${type}\n`)
      raw.write(`data: ${await renderer.sse(commons, template, data, errors)}\n\n`)
    }
  }
}

export const view = ({ error, fragment, layout }, type = html) => {
  const commons = { error, fragment, layout }

  return async (reply, template, {
    data,
    errors = null,
    code = errors ? 422 : 200
  } = {}) => {
    const xhr = matches(reply)

    return reply
      .status(code)
      .type(type)
      .send(await renderer.view(commons, template, data, errors, xhr))
  }
}
