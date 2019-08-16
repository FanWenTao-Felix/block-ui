import * as types from './mutations_types.js'

export default {
  update_dialog_content: ({
                            commit
                          }, dialog) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_DIALOG_CONTENT, dialog)
      resolve()
    })
  },

  clear_dialog_content: ({
                           commit
                         }) => {
    return new Promise((resolve, reject) => {
      commit(types.CLEAR_DIALOG_CONTENT)
      resolve()
    })
  },

  add_page_component: ({
                         commit
                       }, data) => {
    return new Promise((resolve, reject) => {
      commit(types.ADD_PAGE_COMPONENT, data)
      resolve()
    })
  },

  update_site: ({
                  commit
                }, site) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_SITE, site)
      resolve()
    })
  },

  update_page_group: ({
                        commit
                      }, pageGroup) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_PAGE_GROUP, pageGroup)
      resolve()
    })
  },

  update_navs: ({
                  commit
                }, navs) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_NAVS, navs)
      resolve()
    })
  },

  update_top_nav: ({
                     commit
                   }, path) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_TOP_NAV, path)
      resolve()
    })
  },

  update_page: ({
                  commit
                }, page) => {
    return new Promise((resolve, reject) => {
      let items = page.path.split('/') || []
      page.site = items[1]
      page.group = items[2]
      // commit(types.UPDATE_WIDGET_DELETE, null)
      commit(types.UPDATE_PAGE, page)
      resolve()
    })
  }
}
