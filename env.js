import dotenv from 'dotenv'
import './cwd.cjs'

dotenv.config({
  path: './.env'
})

export const {
  CERT,
  FALLBACK,
  KEY,
  NODE_ENV,
  ORIGIN,
  PORT,
  production = NODE_ENV === 'production'
} = process.env
