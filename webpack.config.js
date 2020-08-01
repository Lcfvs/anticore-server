import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { resolve } from 'path'
import TerserJSPlugin from 'terser-webpack-plugin'
import { production } from './env.js'

const mode = production ? 'production' : 'development'

const configs = [
  {
    mode,
    target: 'web',
    entry: {
      main: resolve('project/public/assets/js/main.js'),
      styles: resolve('project/public/assets/css/styles.css')
    },
    module: {
      rules: [
        {
          test: /\.js$/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    output: {
      path: resolve('dist/assets'),
      filename: 'js/[name].min.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].min.css',
        ignoreOrder: false
      })
    ]
  },
  {
    mode,
    target: 'webworker',
    entry: {
      sw: resolve('project/public/assets/js/sw.js')
    },
    module: {
      rules: [
        {
          test: /\.js$/
        }
      ]
    },
    optimization: {
      minimizer: [new TerserJSPlugin({})]
    },
    output: {
      path: resolve('dist'),
      filename: '[name].min.js'
    }
  }
]

export default configs
