import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterPlugin from '../register/router'

import Store from '../store/'
import i18n from '@/lang'
import ViewsRouter from './routes'

Vue.use(VueRouter)
let Router = new VueRouter({
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return {x: 0, y: 0}
  },
  routes: []
})
RouterPlugin.install(Vue, Router, Store, i18n)
Router.addRoutes([...ViewsRouter])
// TODO 菜单动态路由
Router.$vueRouter.formatRoutes(Store.state.user.menu, true)
Router.$vueRouter.filterRoutes(Router)

export default Router
