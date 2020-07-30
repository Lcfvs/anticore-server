import './cwd.cjs'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
})

export const {
  FALLBACK,
  NODE_ENV,
  ORIGIN,
  production = NODE_ENV === 'production'
} = process.env
