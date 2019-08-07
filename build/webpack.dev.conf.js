/**
 1 将hot-reload相关的代码添加到entry chunks
 2 合并基础的webpack配置
 3 使用styleLoaders
 4 配置Source Maps
 5 配置webpack插件
 */
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
/* 使用 html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中 */
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 将热重载的相关配置放入entry的每一项中，达到每一个文件都可以实现热重载的目的
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// webpack-merge的作用类似于extend：少则添加，同则覆盖
module.exports = merge(baseWebpackConfig, {
    module: {
        // 在开发环境下生成cssSourceMap，便于调试（但是官方说cssSourceMap的相对路径有一个bug，所以暂时将其关闭了）
        loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // eval-source-map is faster for development
    // 配置Source Maps 在开发中使用cheap-module-eval-source-map更快
    devtool: '#eval-source-map',
    plugins: [
        // DefinePlugin可以为webpack提供一个在编译时可以配置的全局常量
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        /* 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小 */
        new webpack.optimize.OccurrenceOrderPlugin(),
        /* HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件 */
        new webpack.HotModuleReplacementPlugin(),
        // 页面中的报错不会阻塞编译，但是会在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        /* 将 index.html 作为入口，注入 html 代码后生成 index.html文件 */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrors()
    ]
})
