import { argv, env } from 'process'
import open from 'open'

export const serve = async app => {
  const { port = 8080 } = env

  await app.listen(port)

  if (argv.includes('--open')) {
    await open(`http://127.0.0.1:${port}`)

    console.log(`Your app is listening on port ${port}`)
  }
}
