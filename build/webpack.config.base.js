const config = require('../config')
const path = require('path')

module.exports = {
  entry: {
    bundle: './src/index',
    framework: ['react', 'react-dom', 'react-router']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
              ? config.build.assetsPublicPath
              : config.dev.assetsPublicPath,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src')
    },
  },
}