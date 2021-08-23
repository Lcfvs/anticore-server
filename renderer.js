import { source, serialize } from './template.js'
import { matches } from './hooks/xhr.js'

const {
  entries,
  fromEntries,
  values
} = Object

const contents = {
  [source]: `
  {?errors}
  `,
  *[Symbol.iterator]() {
    for (const pair of Object.entries(this)) {
      yield pair
    }
  }
}

const eol = str => str.split('\n').join('&#10;')

const renderError = function([name, {
  message
}]) {
  return [
    name,
    {
      ...this,
      name,
      message
    }
  ]
}

const renderErrors = (error, errors) =>
  fromEntries(entries(errors)
    .map(renderError, error))

const renderEvent = ({
  error
}, template, data, errors) => {
  return errors ?
    {
      ...contents,
      errors: values(renderErrors(error, errors))
    } :
    {
      ...template,
      data
    }
}

const renderPage = ({
  error,
  layout
}, view, data, errors) => {
  return {
    ...layout,
    view: {
      ...view,
      data,
      errors: errors && renderErrors(error, errors)
    }
  }
}

const renderXHR = ({
  error,
  fragment
}, view, data, errors) => {
  return errors ?
    {
      ...contents,
      errors: values(renderErrors(error, errors))
    } :
    {
      ...fragment,
      view: {
        ...view,
        data
      }
    }
}

export const sse = ({
  error
}) => reply => {
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
    const result = renderEvent({ error }, template, data, errors)

    raw.write(`id: ${id}\n`)
    raw.write(`type: ${type}\n`)
    raw.write(`data: ${eol(await serialize(result))}\n\n`)
  }
}

export const view = ({
 error,
 fragment,
 layout
}, type = 'text/html; charset=utf-8') => async (reply, view, {
  data,
  errors = null,
  code = errors ? 422 : 200
} = {}) => {
  const method = matches(reply) ? renderXHR : renderPage
  const result = method({ error, fragment, layout }, view, data, errors)

  return reply
    .status(code)
    .type(type)
    .send(await serialize(result))
}
