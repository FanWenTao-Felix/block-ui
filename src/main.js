// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/router'
import ElementUI from 'element-ui'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'
import { loadStyle } from './util/util'
import './assets/scss/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import i18n from './lang'

import basicContainer from './components/basic-container/main'

Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局容器
Vue.component('basicContainer', basicContainer)

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
