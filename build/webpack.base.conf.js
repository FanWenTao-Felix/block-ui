/**
 * 配置webpack编译入口
 * 配置webpack输出路径、名称和静态文件路径
 * 配置不同模块的处理规则与命名规则
 */
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')

// 获取根目录
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动解析拓展，可以在引用文件的时候不用写后缀
    extensions: ['*', '.js', '.vue', '.json'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'config': resolve('src/config'),
      'plugins': resolve('src/plugins'),
      'register': resolve('src/register'),
      'store': resolve('src/store'),
      'util': resolve('src/util'),
      'views': resolve('src/views'),
      'themes': resolve('src/components/themes'),
      'layouts': resolve('src/components/layouts'),
      'decorators': resolve('src/components/decorators'),
      'widgets': resolve('src/components/widgets'),
    }
  },
  resolveLoader: {
    // fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
