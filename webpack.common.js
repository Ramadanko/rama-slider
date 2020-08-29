const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'rama-slider.js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
    library: 'RamaSlider'
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
        test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']
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
    new CleanWebpackPlugin()
  ]
}
