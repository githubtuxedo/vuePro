'use strict'
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const path = require('path')

const ESLintPlugin = require('eslint-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils/index')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  optimization: {
    // namedModules: true
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // devServer: {
  //   clientLogLevel: 'silent',

  //   // 告诉服务器内容的来源
  //   contentBase: './dist',

  //   // 为每个静态文件开启 gzip compression
  //   compress: true,
  //   port: 9000,

  //   // 所有中间件执行之前的自定义执行函数
  //   before: function (app, server, compiler) {
  //     app.get('/some/path', function (req, res) {
  //       res.json({ custom: 'response' });
  //     });
  //   },

  //   // 提供自定义中间件，当 devServer 服务器内部的 所有中间件执行完成之后执行
  //   after: function (app, server, compiler) {
  //     // do fancy stuff
  //   },

  //   // 允许将允许访问开发服务器的服务列入白名单
  //   allowedHosts: [
  //     '127.0.0.1',
  //     'localhost',
  //     'subdomain2.host.com',
  //     'host2.com',
  //   ],

  //   // 用于在启动时通过 ZeroConf 网络广播你的开发服务器，用于服务发现
  //   bonjour: false,

  //   // 以减少在 lazy 模式中的编译操作。 默认情况下，在 lazy 模式中，每个请求都触发新的编译
  //   // 使用 filename 仅当请求某个文件时才可执行编译
  //   lazy: true,
  //   filename: '[name].js',

  //   headers: {
  //     'X-Custom-Foo': 'bar',
  //   },

  //   /// 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容    
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
  //     ],
  //     disableDotRule: true,
  //   },

  //   host: '0.0.0.0',

  //   hot: true,

  //   index: 'index.html',
  // },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      // template: 'index.html',
      title: 'Development',
      inject: true
    }),
    // copy custom static assets
    // https://www.npmjs.com/package/copy-webpack-plugin
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new ESLintPlugin({}),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      // devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
