/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import AvueRouter from './avue-router'
import Vue from 'vue'
import Store from '../store/'
Vue.use(VueRouter)

let Router = new VueRouter({
  routes: []
})
AvueRouter.install(Vue, Router, Store, null)
// Router.$avueRouter.formatRoutes(Store.state.user.menu, true)
Router.addRoutes([...PageRouter, ...ViewsRouter])
export default Router
