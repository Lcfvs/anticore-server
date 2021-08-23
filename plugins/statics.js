import plugin from 'fastify-static'

export default (app, { ...rules } = {}) => {
  app.register(plugin, rules)
}
