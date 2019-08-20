export default {
  // 当前站点名称
  site: '',
  // 站点基本信息池,key:site.name
  sites: {},
  // 当前页面组
  group: '',
  // 当前页面地址
  path: '',
  // 页面组的主导航栏数据池,key: site.pageGroup
  navs: {},
  // 页面组的次导航栏数据池,key:主导航栏页面路径
  subnavs: {},
  // 当前主导航栏高亮菜单
  topNav: '',
  // 页面数据池 页面数据和相应组件的缓存对象
  pageDatas: {},
  // 页面组件池
  pageComponents: {
    themes: {},
    layouts: {},
    decorators: {},
    widgets: {}
  },
  // 弹出窗口
  dialogs: [],
  // 最大化的Widget对象
  maximized: null,
  // 当前页面显示的Widget集合
  createdWidgets: {},
  // 当前页面删除的widget集合
  delWidgets: {}
}
