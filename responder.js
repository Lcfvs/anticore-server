import * as renderer from './renderer.js'
import { matches } from './hooks/xhr.js'

const html = 'text/html; charset=utf-8'

const eol = str => str.split('\n').join('&#10;')

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
      const message = await renderer.partial(commons, template, data, errors)

      raw.write(`id: ${id}\n`)
      raw.write(`type: ${type}\n`)
      raw.write(`data: ${eol(message)}\n\n`)
    }
  }
}

export const partial = ({ error }, type = html) => {
  const commons = { error }

  return async (reply, template, {
    data,
    errors = null,
    code = errors ? 422 : 200
  } = {}) => {
    const message = await renderer.partial(commons, template, data, errors)

    return reply
      .status(code)
      .type(type)
      .send(message)
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
    const message = await renderer.view(commons, template, data, errors, xhr)

    return reply
      .status(code)
      .type(type)
      .send(message)
  }
}
