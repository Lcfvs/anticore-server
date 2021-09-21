# anticore-server

A low learning curve [anticore](https://github.com/Lcfvs/anticore) server, based on
* [@lcf.vs/dom-engine](https://github.com/Lcfvs/dom-engine)
* [fastify](https://github.com/fastify/fastify)
* [fastify-compress](https://github.com/fastify/fastify-compress)
* [fastify-multipart](https://github.com/fastify/fastify-multipart)
* [fastify-static](https://github.com/fastify/fastify-static)

## Install

`npm i anticore-server`

## Create the templates

## Create the templates

### A `layout` template

#### src/templates/layout/layout.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="{view.description}" />
  <title>{view.title} - anticore-demo</title>
</head>
<body>
<header>
  <h1>{branding}</h1>
  <ol class="messages"></ol>
</header>
{view}
</body>
</html>
```

#### src/templates/layout/layout.js
```js
import { load } from 'anticore-server/renderer.js'

// loads the ./layout.html and associates the provided properties
export default await load(import.meta, {}, {
  branding: 'anticore-server',
  view: null // just to know which properties can be filled later, on every clone
})
```

### A `fragment` template

#### src/templates/fragment/fragment.html

```html
<meta name="description" content="{view.description}" />
<title>{view.title}</title>
{view}
```

#### src/templates/fragment/fragment.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {},  {
  view: null
})
```

### An `error` template

#### src/templates/error/error.html

```html
<ins class="error" data-after="form [name='{name}']">{message}</ins>
```

#### src/templates/error/invalid.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {}, {
  name: null,
  message: null
})
```

### Some `view` templates

#### The `home`

##### src/templates/view/home/home.html
```html
<main class="{class}">
  <h1>{title}</h1>
</main>
```

##### src/templates/views/home/home.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {}, {
  class: 'home',
  description: 'A homepage description',
  title: 'A homepage title'
})
```

### A `fragment` template

#### src/templates/fragment/fragment.html

```html
<meta name="description" content="{view.description}" />
<title>{view.title}</title>
{view}
```

#### src/templates/fragment/fragment.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {},  {
  view: null
})
```

### An `error` template

#### src/templates/error/error.html

```html
<ins class="error" data-after="form [name='{name}']">{message}</ins>
```

#### src/templates/error/invalid.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {}, {
  name: null,
  message: null
})
```

### A `view` component

##### src/templates/components/view/view.html
```html
<main class="{class}">
  <h1>{title}</h1>
</main>
```

##### src/templates/components/view/view.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {}, {
  class: null,
  contents: null,
  description: null,
  title: null
})
```

### Some `view` templates

#### The `home`

##### src/templates/views/home/home.js
```js
import view from '../../components/view/view.js'

export default {
  ...view,
  class: 'home',
  contents: 'A home view content',
  description: 'A homepage description',
  title: 'A homepage title'
}
```

#### The `Not Found`

##### src/templates/views/error404/error404.js
```js
import view from '../../components/view/view.js'

export default {
  ...view,
  class: 'error error404',
  contents: null,
  description: 'Page not found',
  title: 'Page not found'
}
```

#### The `Internal Server Error`

##### src/templates/views/error500/error500.js
```js
import view from '../../components/view/view.js'

export default {
  ...view,
  class: 'error error500',
  contents: null,
  description: 'Internal Server Error',
  title: 'Internal Server Error'
}
```

### A `sse` template

#### src/templates/sse/message/message.html
```html
<li class="message">{contents}</li>
```

#### src/templates/sse/message/message.js
```js
import { load } from 'anticore-server/renderer.js'

export default await load(import.meta, {}, {
  contents: null
})
```

## Create your own responder

### src/lib/responder.js

```js
import * as responder from 'anticore-server/responder.js'
import error from '../templates/error/error.js'
import fragment from '../templates/fragment/fragment.js'
import layout from '../templates/layout/layout.js'

// Used for the partials
export const partial = responder.partial({ error })

// Used for the views
export const view = responder.view({ error, fragment, layout })

// Used for the Server-Sent Events
export const sse = responder.sse({ error })
```

#### `sse(reply)`

Returns an `async` function to emit an event to the client

```js
await event(eventName, id, template, {
  // Your dynamic data
  data: {},
  /*
  // Optional object, rendered using the error template
  errors: null
  */
})
```

#### `partial(reply)`

Returns an `async` function to reply a partial to the client

```js
await partial(reply, template, {
  // Your dynamic data
  data: {},
  /*
  // Optional object, rendered using the error template
  errors: null,
  // optional code, resolved like this by default `errors ? 422 : 200`
  code: 200
  */
})
```

#### `view(reply)`

Returns an `async` function to emit a view to the client

```js
await view(reply, template, {
  // Your dynamic data
  data: {},
  /*
  // Optional object, rendered using the error template
  errors: null,
  // optional code, resolved like this by default `errors ? 422 : 200`
  code: 200
  */
})
```

## Create an app

### src/lib/app.js

```js
import createApp from 'anticore-server/app.js'
// import { resolve } from 'path'
// import { cwd } from 'process'
import { view } from '../lib/responder.js'
import error404 from '../templates/views/error404/error404.js'
import error500 from '../templates/views/error500/error500.js'

const app = createApp({
  /*
  // fastify options, no defaults
  app: {},
  // fastify-compress options, no defaults
  compress: {},
  // fastify-multipart options, with the following defaults
  multipart: {
    attachFieldsToBody: true
  },
  // fastify-static options, with the following defaults
  statics: {
    prefix: '/assets/',
    root: resolve(cwd(), `src/assets`)
  }
  */
})

app.setNotFoundHandler(async (request, reply) => {
  return view(reply, error404, {
    data: {
      contents: 'Unable to locate the requested page'
    },
    code: 404
  })
})

app.setErrorHandler(async (error, request, reply) => {
  request.log.error(error)

  return view(reply, error500, {
    data: {
      contents: 'Oops, an unexcpected error was thrown'
    },
    code: 500
  })
})

export default app
```

## Create some routes

### A default route (view)

#### src/routes/home.js
```js
import app from '../lib/app.js'
import { view } from '../lib/responder.js'
import home from '../templates/views/home/home.js'

app.get('/', async (request, reply) => {
  return view(reply, home)
})
```

### A `messages` route (sse)

#### src/routes/messages.js
```js
import { setTimeout } from 'timers/promises'
import app from '../lib/app.js'
import { sse } from '../lib/responder.js'
import message from '../templates/sse/message/message.js'

app.get('/messages', async (request, reply) => {
  const event = sse(reply)

  let id = 0

  while (!reply.raw.writableEnded) {
    id += 1

    await event('ping', id, message, {
      data: {
        message: `Message ${id}`
      }
    })

    await setTimeout(1000)
  }
})
```

## Index your routes

#### src/routes/index.js

```js
import './home.js'
import './messages.js'
```

## Serve your app

### src/serve.js

```js
import { serve } from 'anticore-server/server.js'
import app from './lib/app.js'
import './routes/index.js'

await serve(app)
```

## Start it

`node src.serve.js --open`

## Need some interactivity?

See it in action into the [anticore](https://github.com/Lcfvs/anticore) [demo](https://glitch.com/edit/#!/anticore-demo?path=src%2Fserve.js%3A1%3A0)

## Changelog

[changelog](./changelog.md)

## License

[MIT](./license.md)
