const env = process.env.NODE_ENV;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = [
  {
    test: /\.tsx?$/, use: ["ts-loader"], exclude: [/node_modules/]
  },
  {
    test: /\.(css|scss)$/, use: [
      MiniCssExtractPlugin.loader, 'css-loader',
      {
        loader: 'sass-loader', options: {
          sourceMap: env === 'production' ? false : true,
          sassOptions: { outputStyle: env === 'production' ? 'compressed' : 'expanded' }
        }
      }
    ],
    exclude: [/node_modules/]
  }
]
module.exports = rules
