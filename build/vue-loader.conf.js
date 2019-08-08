var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 配置在.vue文件中的css相关处理规则
  loaders: utils.cssLoaders({
    // 根据所处环境是否生成sourceMap用于代码调试
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    // 是否将单独的css文件（一般为引入的外部文件）进行提取单独打包
    extract: isProduction
  }),
  /**
   * 通过vue-loader的transformToRequire，可简化引入图片等的：
   * <avatar default-src="../../assects/img/logo.png"></avatar>
   */
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
