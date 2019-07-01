var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 给出正确的绝对路径
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})


module.exports = {
    // 配置webpack编译入口
    entry: {
        app: './src/main.js'
    },

    // 配置webpack输出路径和命名规则
    output: {
        // webpack输出的目标文件夹路径（例如：/dist）

        path: path.resolve(__dirname, 'dist'),
        // webpack输出bundle文件命名格式
        filename: '[name].js',
        // webpack编译输出的发布路径
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },

        // 配置模块resolve的规则
    resolve: {
        // 自动resolve的扩展名
        extensions: ['.js', 'ts','.vue', '.json','tsx'],
        // resolve模块的时候要搜索的文件夹

        modules: [ resolve('src'), resolve('node_modules') ],

        // 创建路径别名，有了别名之后引用模块更方便，

        // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
        alias: {
            // 'vue$': 'vue/dist/vue.common.js',
            // 'src': resolve('src'),
            // 'assets': resolve('src/assets'),
            // 'components': resolve('src/components')
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },

    // 配置不同类型模块的处理规则
    module: {
        rules: [
            // ...(config.dev.useEslint?[createLintingRule()] : []),
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: Object.assign(vueLoaderConfig, {
                loaders: {
                    ts: "ts-loader",
                    tsx: "babel-loader!ts-loader"
                }
                })
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 20000, // size <= 20KB
                            publicPath: "static/",
                            outputPath: "static/"
                        }
                    }
                ]
            }
        ]
    }
}