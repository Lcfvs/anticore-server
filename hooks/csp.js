export default (app, [...rules] = []) => {
  app.addHook('preHandler', async (request, reply) => {
    reply.header('content-security-policy', rules.join('; '))
  })
}

