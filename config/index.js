'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    index: path.resolve(__dirname, '../index.html'),
    proxyTable: {
      '/api/': {
        target: 'http://10.237.146.41:8081',      // xm
        changeOrigin: true,
      },
    },
    host: 'localhost',
    port: 8080, 
    autoOpenBrowser: true,
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    index: path.resolve(__dirname, '../index.html'),

    // 开启 Gzip 压缩
    productionGzipExtensions: ['js', 'css'],
    productionGzip: true,   
  }
}