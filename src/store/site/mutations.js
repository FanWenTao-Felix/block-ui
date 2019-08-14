import * as types from './mutations_types'
import Vue from 'vue'
import _ from 'underscore'

export default {
  [types.UPDATE_SITE] (state, site) {
    Vue.set(state.sites, site.name, site)
    state.site = site.name
  },

  [types.ADD_PAGE_COMPONENT] (state, {name, type, mode, component}) {
    type += 's'
    if (mode) {
      if (!state.pageComponents[type][name]) {
        Vue.set(state.pageComponents[type], name, {})
      }
      Vue.set(state.pageComponents[type][name], mode, component)
    } else {
      Vue.set(state.pageComponents[type], name, component)
    }
  },

  [types.UPDATE_PAGE_GROUP] (state, {site, group}) {
    state.site = site
    state.group = group
  },

  [types.UPDATE_NAVS] (state, {navs, subNavs}) {
    if (!navs && !subNavs && state.navs[state.site]) { // 清除私有导航页面及子导航信息
      let privateNavs = state.navs[state.site]['private']
      Vue.set(state.navs[state.site], 'private', navs)
      if (privateNavs) {
        _.each(privateNavs, (nav) => {
          Vue.set(state.subnavs, nav.path, subNavs)
        })
      }
    }
    if (!state.navs[state.site]) {
      Vue.set(state.navs, state.site, {})
    }
    Vue.set(state.navs[state.site], state.group, navs)
    _.each(subNavs, (value, key) => {
      Vue.set(state.subnavs, key, value)
    })
  },

  [types.UPDATE_TOP_NAV] (state, path) {
    state.topNav = path
  },

  [types.UPDATE_PAGE] (state, page) {
    state.path = page.path
    Vue.set(state.pageDatas, page.path, page)
  },

  [types.UPDATE_DIALOG_CONTENT] (state, dialog) {
    if (dialog) {
      dialog.visible = true
      dialog.width = dialog.width || '640px'
      dialog.top = dialog.top || '5%'
    }
    state.dialog = dialog || {}
  }
}
