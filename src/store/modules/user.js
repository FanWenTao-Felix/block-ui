import { setStore, getStore } from '@/util/store'
import {isURL, validatenull} from '@/util/validate'
import {deepClone} from '@/util/util'
import webiste from '@/config/website'
import {getMenu, getTopMenu} from '@/api/user'

function addPath (ele, first) {
  const menu = webiste.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    userInfo: getStore({name: 'userInfo'}) || [],
    permission: getStore({name: 'permission'}) || {},
    roles: [],
    menu: getStore({name: 'menu'}) || [],
    menuAll: [],
    token: getStore({name: 'token'}) || ''
  },
  actions: {
    // 获取系统菜单
    GetMenu ({commit, dispatch}, parentId) {
      return new Promise(resolve => {
        getMenu(parentId).then((res) => {
          const data = res.data.data
          let menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele, true)
          })
          commit('SET_MENU', menu)
          dispatch('GetButtons')
          resolve(menu)
        })
      })
    },
    GetTopMenu () {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    }
  },
  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({name: 'menu', content: state.menu, type: 'session'})
    }
  }
}

export default user
