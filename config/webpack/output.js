const env = process.env.NODE_ENV;
const path = require('path')
const targetOutputFolder = env === 'production' ? '../../dist' : '../../build'
module.exports = {
  filename: (pathData) => (pathData.chunk.name === 'RamaSlider' ? 'index.js' : '[name]/[name].js'),
  path: path.resolve(__dirname, targetOutputFolder),
  libraryTarget: 'umd',
  library: '[name]',
  globalObject: 'this'
}
