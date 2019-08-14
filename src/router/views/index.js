import {Login, Page, NoPage, NoSite, NotFound} from '@/views/index'
import frame from '@/views/frame'
export default [
  {
    path: '/login',
    name: '登录页',
    component: Login
  }, {
    path: '/noPage',
    name: 'noPage',
    component: NoPage
  }, {
    path: '/noSite',
    name: 'noSite',
    component: NoSite
  }, {
    path: '/notFound',
    name: 'notFound',
    component: NotFound
  }, {
    path: '/:site/:type(public|private)/:path*',
    name: 'frame',
    component: frame
  }, {
    path: '/wel',
    component: Page,
    // redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      meta: {
        i18n: 'dashboard'
      },
      component: () =>
        import(/* webpackChunkName: "views" */ '@/views/wel')
    }]
  }]
