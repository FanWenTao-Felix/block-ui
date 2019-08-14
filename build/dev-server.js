/**
 1 检查npm与node的版本
 2 引入相关插件和配置
 3 创建express服务器和webpack编译器
 4 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
 5 挂载代理服务和中间件
 6 配置静态资源
 7 启动服务器监听特定端口（8080）
 8 自动打开浏览器并打开特定网址（localhost:8080）
 */
// 检查 Node 和 npm 版本
require('./check-versions')()
var config = require('../config')
/*
* 如果没有通过DefinePlugin设置全局process.env字段，那么默认为开发环境
*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

var path = require('path')
var express = require('express')
var webpack = require('webpack')
// opn可以跨平台打开网站(并跳转到指定 url)、文件、可执行文件
var opn = require('opn')
// 如果发生了跨域的情况，可以通过http-proxy-middleware这个中间件进行反向代理，解决跨域问题
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'development')
  ? require('./webpack.dev.conf')
  : require('./webpack.prod.conf')

/* 如果没有指定运行端口，使用 config.dev.port 作为运行端口 */
var port = process.env.PORT || config.dev.port
// 配置是否自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
/* 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置  获取需要转发的接口 */
var proxyTable = config.dev.proxyTable

/* 使用 express 启动一个服务 */
var app = express()
// 将webpack的开发环境设置放入webpack中，启动编译
var compiler = webpack(webpackConfig)

/*
* 启动 webpack-dev-middleware
* 将compiler挂载在dev-server上，监听本地代码变化，变化则启动编译并将编译后的文件暂存到内存中
*/
var devMiddleware = require('webpack-dev-middleware')(compiler, {
// 设置中间件的公共路径，值与webpack的公共路径相同
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

/*
* 启动 webpack-hot-middleware
* 编译后发送通知到HRM Runtime，HRM Runtime收到update通知后，下载更新的模块，
* 通知APP更新，APP收到通知，然后要求HRM Runtime执行模块替换
*/
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  // 设置回调来访问html-webpack-plugin的after-emit（发射后）钩子
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // 发布热重载事件并传入一个对象，在dev-client.js中可以subscribe到这个对象
    hotMiddleware.publish({action: 'reload'})
    // 由于after-emit阶段是异步的，所以必须设置一个回调函数并调用它
    cb()
  })
})

// 遍历反向代理的配置，利用proxyMiddleware进行反向代理
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将热重载挂载到实例上并输出相关状态和编译错误
app.use(hotMiddleware)

// serve pure static assets
// 拼接 static文件夹的静态资源路径,获取配置中的静态资源绝对路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 当开发环境中如果遇到了路径为staticPath的资源，那么到./static中引用该资源
app.use(staticPath, express.static('./static'))

/*var modulesPath = path.posix.join(config.dev.assetsPublicPath, 'global')
app.use(modulesPath, express.static('./global'))*/

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// 当编译生效的时候执行回调函数
devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
