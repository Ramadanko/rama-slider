const env = process.env.NODE_ENV;
const minify = env === 'production' ? true : false
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
    inject: 'head',
    minify,
    chunks: ['BasicSlider'],
    hash: true
  }),
  new HtmlWebpackPlugin({
    filename: 'FadeSlider/FadeSlider.html',
    template: './src/FadeSlider/FadeSlider.html',
    inject: 'head',
    minify,
    chunks: ['FadeSlider'],
    hash: true
  }),
  new HtmlWebpackPlugin({
    filename: 'AnimatedSlider/AnimatedSlider.html',
    template: './src/AnimatedSlider/AnimatedSlider.html',
    inject: 'head',
    minify,
    chunks: ['AnimatedSlider'],
    hash: true
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
