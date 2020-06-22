import * as server from './anticore-server/root.js'
import * as project from './project/root.js'
import { production } from './env.js'

export default [project, ...production ? [] : [server]]
  .filter(Boolean)
  .reduce((entries, { ['default']: e, ...root }) => [
    ...entries,
    ...Object.values(root)
  ], [])
