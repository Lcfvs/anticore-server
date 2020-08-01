import { timeout } from '../../../../common/utils/promised.js'

function clone (request) {
  return request.clone
    ? request.clone()
    : new URL(request, self.location.origin)
}

export default {
  cache: {},
  name: 'default',
  timeout: 500,
  async add (request) {
    return (await this.open()).add(clone(request))
  },
  async addAll ([...requests]) {
    console.log(requests)
    return (await this.open()).addAll(requests.map(clone))
  },
  async delete (request, { ...options } = {}) {
    return (await this.open()).delete(clone(request), options)
  },
  async fallback () {
    return this.match(this.cache.fallback)
  },
  async fetch (request, [...rules] = []) {
    console.log('req', request.url)
    try {
      const promise = self.fetch(request)
      let response = await timeout(promise, this.timeout)

      if (!response) {
        promise.then(response => this.put(request, response))

        response = (await this.match(request)) || await this.fallback()
      } else if (response.ok && rules.every(rule => rule(request, response))) {
        await this.put(request, response)
      }

      return response
    } catch (e) {}

    return this.fallback()
  },
  async keys (request, { ...options } = {}) {
    return (await this.open()).keys(clone(request), options)
  },
  listen () {
    self.addEventListener('install', async event => {
      event.waitUntil(
        this.fetch(new Request('/cache.json'))
          .then(response => response.json())
          .then(cache => Object.assign(this, { cache }))
          .then(() => {
            const { statics, ...cache } = this.cache

            return this.addAll([
              ...Object.values(cache),
              ...statics
            ])
          }))
        .then(() => self.skipWaiting())
    })

    self.addEventListener('activate', async event => {
      if (self.registration.navigationPreload) {
        event.waitUntil(self.registration.navigationPreload.enable())
      } else {
        event.waitUntil(self.clients.claim())
      }
    })

    self.addEventListener('fetch', async event => {
      const { request } = event

      if (request.method === 'GET') {
        const promise = this.fetch(request)

        event.waitUntil(promise)
        event.respondWith(await promise)
      }
    })
  },
  async match (request, { ...options } = {}) {
    return (await this.open()).match(clone(request), options)
  },
  async matchAll (request, { ...options } = {}) {
    return (await this.open()).matchAll(clone(request), options)
  },
  async open () {
    return caches.open(this.name)
  },
  async put (request, response) {
    return (await this.open()).put(clone(request), clone(response))
  }
}
