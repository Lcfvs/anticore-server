import { production } from './env.js'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserJSPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const mode = production ? 'production' : 'development'

export default {
  mode,
  entry: {
    main: path.resolve('project/assets/js/main.js'),
    style: path.resolve('project/assets/css/style.css')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    path: path.resolve('dist/assets'),
    filename: 'js/[name].min.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      ignoreOrder: false
    })
  ]
}
