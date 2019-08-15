/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 */

import user from './user/'
import site from './site/'

export default [{
  module: 'user',
  name: '用户管理',
  list: user
}, {
  module: 'site',
  name: '站点管理',
  list: site
}]

