import * as server from './anticore-server/root.js'
import { production } from './env.js'
import * as project from './project/root.js'

export default [project, ...production ? [] : [server]]
  .filter(Boolean)
  .reduce((entries, { default: e, ...root }) => [
    ...entries,
    ...Object.values(root)
  ], [])
