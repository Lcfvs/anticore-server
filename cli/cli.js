import webpack from 'webpack'
import config from '../webpack.config.js'

const compiler = webpack(config)

compiler.watch({}, (err, stats) => {
  if (err || stats.hasErrors()) {
    return console.error(err || stats.toString({
      // Add console colors
      colors: true
    }))
  }

  console.log(stats.toString({
    colors: true
  }))
})
