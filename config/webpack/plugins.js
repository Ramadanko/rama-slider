const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
    inject: false,
    minify: true
  }),
  new HtmlWebpackPlugin({
    filename: 'FadeSlider/FadeSlider.html',
    template: './src/FadeSlider/FadeSlider.html',
    inject: false,
    minify: true
  }),
  new HtmlWebpackPlugin({
    filename: 'AnimatedSlider/AnimatedSlider.html',
    template: './src/AnimatedSlider/AnimatedSlider.html',
    inject: false,
    minify: true
  }),
  new MiniCssExtractPlugin({
    moduleFilename: (chunk) => {
      return chunk.name === 'RamaSlider' ? `${chunk.name}.css` : `${chunk.name}/${chunk.name}.css`
    }
  }),
  new CopyPlugin({
    patterns: [
      { from: "./src/images", to: "images" }
    ]
  })
]

module.exports = plugins
