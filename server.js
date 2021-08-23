import { argv, env } from 'process'
import open from 'open'

export const serve = async app => {
  const port = env.PORT ?? 8080

  await app.listen(port)

  if (argv.includes('--open')) {
    await open(`http://127.0.0.1:${port}`)
  }

  console.log(`Your app is listening on port ${port}`)
}
