const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: config.dev.index,
        inject: 'body',
        minify: {
          html5: true
        },
        hash: false
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, '../src'),
        },
        {
          test: /\.css$/,
          use:['style-loader','css-loader'],
        },
        {
            test: /\.less?$/,
            use : [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader?{"sourceMap":true}',
            ],
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: {
              loader: 'file-loader',
              query: {
                limit: 10240,
              }
            },
        }
      ]
    },
    devServer: {
      host: config.dev.host,
      port: config.dev.port,
      contentBase: path.join(__dirname, '../'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      https: false,
      noInfo: true,
      open: config.dev.autoOpenBrowser,
      proxy: config.dev.proxyTable,
    }
});
