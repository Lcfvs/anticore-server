import { load, serialize, source, template } from '@lcf.vs/dom-engine/lib/backend.js'
import { readFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

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

const renderPartial = ({
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

export { load, serialize, source, template }

export const partial = async ({ error }, template, data, errors) =>
  serialize(renderPartial({ error }, template, data, errors))

export const view = async ({
  error,
  fragment,
  layout
}, view, data, errors, xhr = false) => {
  const method = xhr ? renderXHR : renderPage

  return serialize(method({ error, fragment, layout }, view, data, errors))
}

