import dotenv from 'dotenv'
import './cwd.cjs'

dotenv.config({
  path: './.env'
})

export const {
  FALLBACK,
  NODE_ENV,
  ORIGIN,
  PORT,
  production = NODE_ENV === 'production'
} = process.env
