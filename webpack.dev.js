const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const dotenv = require('dotenv')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = env => {
  const currentPath = path.join(__dirname)
  const basePath = `${currentPath}/.env`
  const envPath = `${basePath}.${env.ENVIRONMENT}`
  const finalPath = fs.existsSync(envPath) ? envPath : basePath
  const fileEnv = dotenv.config({ path: finalPath }).parsed
  const envKeys = fileEnv
    ? Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
        return prev
      }, {})
    : {}

  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hotOnly: true,
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          ]
        }
      ]
    }
  })
}
