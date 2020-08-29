const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'rama-slider.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    library: 'RamaSlider'
  }
})
