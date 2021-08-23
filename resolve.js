import path from 'path'
import { fileURLToPath } from 'url'

export default ({ url }, ...segments) =>
  path.resolve(path.dirname(fileURLToPath(url)), ...segments)
