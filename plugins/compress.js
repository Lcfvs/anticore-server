import plugin from 'fastify-compress'

export default (app, { ...rules } = {}) => {
  app.register(plugin, rules)
}
