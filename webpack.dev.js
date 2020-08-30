const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // webpack-dev-server require webpack file to be named webpack.config.json which comes from common variable
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  }
})
