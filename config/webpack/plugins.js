const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    title: 'Rama Slider',
    inject: false
  }),
  new HtmlWebpackPlugin({
    filename: 'BasicSlider/BasicSlider.html',
    template: './src/BasicSlider/BasicSlider.html',
    inject: false
  }),
  new HtmlWebpackPlugin({
    filename: 'FadeSlider/FadeSlider.html',
    template: './src/FadeSlider/FadeSlider.html',
    inject: false
  }),
  new MiniCssExtractPlugin({
    moduleFilename: (chunk) => {
      return chunk.name === 'RamaSlider' ? `${chunk.name}.css` : `${chunk.name}/${chunk.name}.css`
    }
  })
]

module.exports = plugins
