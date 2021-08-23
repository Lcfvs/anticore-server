import { serialize, source } from '@lcf.vs/dom-engine/lib/backend.js'
import { readFile } from 'fs/promises'
import resolve from './resolve.js'

export default async ({ url }, { ...data } = {}) => ({
  [source]: `${await readFile(resolve({ url }, 'template.html'))}`,
  ...data
})

export { serialize, source }
