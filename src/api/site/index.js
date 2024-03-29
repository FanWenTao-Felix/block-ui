export default [
  {
    name: '获取站点信息',
    method: 'siteInfo',
    path: '/site/siteInfo',
    type: 'post'
  }, {
    name: '获取站点页面列表',
    method: 'pages',
    path: '/site/pages',
    type: 'get'
  }, {
    name: '获取页面信息',
    method: 'pageInfo',
    path: '/site/pageInfo',
    type: 'get'
  }, {
    name: '获取主题列表',
    method: 'themeList',
    path: '/site/themeList',
    type: 'get'
  }, {
    name: '保存用户自定义主题',
    method: 'saveCustomTheme',
    path: '/customTheme/saveCustomTheme',
    type: 'get'
  },
  {
    name: '获取所有布局信息',
    method: 'getAllLayOutList',
    path: '/layout/getAllLayOutList',
    type: 'get'
  },
  {
    name: '获取个性化页面菜单数据',
    method: 'getDiyPageTree',
    path: '/site/getDiyPageTree',
    type: 'get'
  }
]
