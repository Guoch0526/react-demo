const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const utils = require('../config/utils')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath("js/[name].[hash:16].js"),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
      publicPath: ''
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 5000000, 
      maxAssetSize: 3000000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: utils.assetsPath('css/[name].[hash].css'),
          chunkFilename: utils.assetsPath('css/[id].[hash].css'),
        }),
        new HtmlWebpackPlugin({
          inject: 'body',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          template: config.build.index
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../src/assets/js'),
            to: path.resolve(config.build.assetsRoot, 'libs'),
            ignore: ['.*'],
          }
        ])
    ],
    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: ['*', '.web.js', '.js', '.json'],
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin()
      ],
      splitChunks: {
        chunks: "all",
        minChunks: 1,
        minSize: 0,
        cacheGroups: {
          framework: {
            test: "framework",
            name: "framework",
            enforce: true,
            reuseExistingChunk: true
          },
          vendor: {
            priority: 10,
            test: /node_modules/,
            name: "vendor",
            enforce: true,
            reuseExistingChunk: true
          }
        }
      }
    },
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
              use:[MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.less?$/,
                use : [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'less-loader?{"sourceMap":true}',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    outputPath: 'static/assets',
                    limit: 10240,
                  },
                },
            }
        ]
    }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


module.exports = webpackConfig
