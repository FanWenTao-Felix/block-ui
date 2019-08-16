// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import 'plugins/'
import 'register/index'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './lang'

import {iconfontUrl, iconfontVersion} from 'config/env'
import {loadStyle} from 'util/util'
// eslint-disable-next-line no-duplicate-imports
import * as urls from '@/config/env'
import './assets/scss/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/iconfont/iconfont.css'
import basicContainer from './components/basic-container/main'

Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局容器
Vue.component('basicContainer', basicContainer)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  i18n,
  render: r => r(App)
}).$mount('#app')
