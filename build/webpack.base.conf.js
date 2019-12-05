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

    target: "web", // 默认构建浏览器端

    // 配置webpack输出路径和命名规则
    output: {
        // webpack输出的目标文件夹路径（例如：/dist）
        path: path.resolve(__dirname, 'dist'),
        // webpack输出bundle文件命名格式
        filename: '[name].js',
        chunkFilename: "[chunkhash].js",
        // webpack编译输出的发布路径
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        /** 使用CDN和资源hash的复杂示例 **/
        // path: "/home/proj/cdn/assets/[hash]",
        // publicPath: "http://cdn.example.com/assets/[hash]/"
        /** ============================= **/
    },

        // 配置模块resolve的规则
    resolve: {
        // 解析模块请求的选项
        // （不适用于对 loader 解析）

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
        },

        enforceExtension: false,
        // 如果为 true，请求必不包括扩展名
        // 如果为 false，请求可以包括扩展名

        unsafeCache: true,
        unsafeCache: {},
        // 为解析的请求启用缓存
        // 这是不安全，因为文件夹结构可能会改动
        // 但是性能改善是很大的
    },

    // 配置不同类型模块的处理规则
    module: {
        rules: [
            // ...(config.dev.useEslint?[createLintingRule()] : []),
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                enforce: 'pre',
                // pre post值 标识应用这些规则，即使规则覆盖（高级选项）
                loader: 'tslint-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
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
                // exclude 是必不匹配选项（优先于 test 和 include）
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
                // test 和 include 具有相同的作用，都是必须匹配选项
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
            },
            { oneOf: [ /* rules */] },
            // 只使用这些嵌套规则之一

            { rules: [ /* rules */] },
            // 使用所有这些嵌套规则（合并可用条件）

            { resource: { and: [ /* 条件 */] } },
            // 仅当所有条件都匹配时才匹配

            { resource: { or: [ /* 条件 */] } },
            { resource: [ /* 条件 */] },
            // 任意条件匹配时匹配（默认为数组）

            // { resource: { not: /* 条件 */ } }
            // 条件不匹配时匹配
        ],
        noParse: [
            /special-library\.js$/
        ],
        // 不解析这里的模块
    },

    externals: ["react", /^@angular\//],
    // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

    cache: true,    //启用缓存
}