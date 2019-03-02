const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const fs = require('fs')
const dotenv = require('dotenv')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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

  console.log(envKeys)

  return merge(common, {
    mode: 'production',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[hash].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64]'
              }
            }
          ]
        }
      ]
    }
  })
}
