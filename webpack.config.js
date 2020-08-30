const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web',
  entry: {
    RamaSlider: './src/index.ts',
    BasicSlider: './src/BasicSlider/BasicSlider.ts'
  },
  output: {
    filename: (pathData) => (pathData.chunk.name === 'RamaSlider' ? '[name].js' : '[name]/[name].js'),
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
    library: '[name]'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, use: ["ts-loader"], exclude: [/node_modules/]
      },
      {
        test: /\.(css|scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'Rama Slider',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'BasicSlider/BasicSlider.html',
      template: './src/BasicSlider/BasicSlider.html'
    }),
    new MiniCssExtractPlugin({
      moduleFilename: (chunk) => {
        return chunk.name === 'RamaSlider' ? `${chunk.name}.css` : `${chunk.name}/${chunk.name}.css`
      }
    })
  ]
}

