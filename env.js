import './cwd.cjs'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
})

export const production = process.env.NODE_ENV === 'production'
export const port = process.env.PORT || 8080
