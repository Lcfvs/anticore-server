const registry = new WeakMap()

export default app => {
  app.addHook('preHandler', async (request, reply) => {
    if (request.headers['x-requested-with'] === 'XMLHttpRequest') {
      registry.set(reply, true)
    }
  })
}

export const matches = reply => registry.has(reply)
