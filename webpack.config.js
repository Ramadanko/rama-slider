const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'; // NODE_ENV is by command for production only
const path = require('path')
const output = require('./config/webpack/output')
const plugins = require('./config/webpack/plugins')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let webpackOptions = {
  mode: env,
  target: 'web',
  entry: {
    RamaSlider: './src/index.ts',
    BasicSlider: './src/BasicSlider/BasicSlider.ts',
    FadeSlider: './src/FadeSlider/FadeSlider.ts'
  },
  output,
  plugins,
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
  // webpack-dev-server require webpack file to be named webpack.config.json
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  }
}

if (env === 'development') {
  webpackOptions.devtool = 'inline-source-map'
}

module.exports = webpackOptions

