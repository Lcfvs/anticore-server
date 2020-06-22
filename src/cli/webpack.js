import webpack from 'webpack'
import config from '../../webpack.config.js'

const compiler = webpack(config)

function handler (err, stats) {
  if (err || stats.hasErrors()) {
    console.error(err)
  }

  console.log(stats.toString({
    colors: true
  }))
}

compiler.run(handler)
