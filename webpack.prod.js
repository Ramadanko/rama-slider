const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: (pathData) => (pathData.chunk.name === 'RamaSlider' ? '[name].js' : '[name]/[name].js'),
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    library: '[name]'
  }
})
