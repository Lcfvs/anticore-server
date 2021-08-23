import plugin from 'fastify-multipart'

export default (app, { ...rules } = {}) => {
  app.register(plugin, rules)
}
