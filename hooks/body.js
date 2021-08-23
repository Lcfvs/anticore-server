const { entries, fromEntries } = Object

const field = ([name, { value }]) => [name, value]

export default app => {
  app.addHook('preHandler', async request => {
    const { body } = request

    request.body = body && fromEntries(entries(body).map(field))
  })
}
