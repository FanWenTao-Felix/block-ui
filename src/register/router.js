import filters from '@/router/filters'
import _ from 'underscore'

let RouterPlugin = function () {
  this.$router = null
  this.$store = null
}
RouterPlugin.install = function (vue, router, store, i18n) {
  this.$router = router
  this.$store = store
  // eslint-disable-next-line new-cap
  this.$vue = new vue({i18n})

  function isURL (s) {
    return /^http[s]?:\/\/.*!/.test(s)
  }

  function objToform (obj) {
    let result = []
    Object.keys(obj).forEach(ele => {
      result.push(`${ele}=${obj[ele]}`)
    })
    return result.join('&')
  }

  this.$router.$vueRouter = {
    // 全局配置
    $website: this.$store.getters.website,
    routerList: [],
    group: '',
    meta: {},
    safe: this,
    // 设置标题
    setTitle: (title) => {
      const defaultTitle = this.$vue.$t('title')
      title = title ? `${title}-${defaultTitle}` : defaultTitle
      document.title = title
    },
    closeTag: (value) => {
      let tag = value || this.$store.getters.tag
      if (typeof value === 'string') {
        tag = this.$store.getters.tagList.filter(ele => ele.value === value)[0]
      }
      this.$store.commit('DEL_TAG', tag)
    },
    generateTitle: (title, key) => {
      if (!key) return title
      const hasKey = this.$vue.$te('route.' + key)
      if (hasKey) {
        // $t :this method from vue-i18n, inject in @/lang/index.js
        return this.$vue.$t('route.' + key)
      }
      return title
    },
    // 处理路由
    getPath: function (params) {
      let {src} = params
      let result = src || '/'
      if (src.includes('http') || src.includes('https')) {
        result = `/myiframe/urlPath?${objToform(params)}`
      }
      return result
    },
    // 正则处理路由
    vaildPath: function (list, path) {
      let result = false
      list.forEach(ele => {
        if (new RegExp('^' + ele + '.*', 'g').test(path)) {
          result = true
        }
      })
      return result
    },
    // 设置路由值
    getValue: function (route) {
      let value = ''
      if (route.query.src) {
        value = route.query.src
      } else {
        value = route.path
      }
      return value
    },
    // 设置拦截器
    filterRoutes: function (router) {
      _.each(filters, (filter) => {
        router.beforeEach((to, from, next) => {
          filter.call(router.app, to, from, next)
        })
      })
    },
    // 动态路由
    formatRoutes: function (aMenu = [], first) {
      const aRouter = []
      const propsConfig = this.$website.menu.props
      const propsDefault = {
        label: propsConfig.label || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children',
        meta: propsConfig.meta || 'meta'
      }
      if (aMenu.length === 0) return
      for (let i = 0; i < aMenu.length; i++) {
        const oMenu = aMenu[i]
        if (this.routerList.includes(oMenu[propsDefault.path])) return
        // eslint-disable-next-line one-var
        const path = (() => {
            if (first) {
              return oMenu[propsDefault.path].replace('/index', '')
            } else {
              return oMenu[propsDefault.path]
            }
          })(),
          // 特殊处理组件
          component = 'views' + oMenu.path,
          name = oMenu[propsDefault.label],
          icon = oMenu[propsDefault.icon],
          children = oMenu[propsDefault.children],
          meta = oMenu[propsDefault.meta] || {}

        const isChild = children.length !== 0
        const oRouter = {
          path: path,
          component (resolve) {
          },
          name: name,
          icon: icon,
          meta: meta,
          redirect: (() => {
            if (!isChild && first && !isURL(path)) return `${path}/index`
            else return ''
          })(),
          // 处理是否为一级路由
          children: !isChild ? (() => {
            if (first) {
              if (!isURL(path)) oMenu[propsDefault.path] = `${path}/index`
              return [{
                component (resolve) {
                  require([`../${component}.vue`], resolve)
                },
                icon: icon,
                name: name,
                meta: meta,
                path: 'index'
              }]
            }
            return []
          })() : (() => {
            return this.formatRoutes(children, false)
          })()
        }
        aRouter.push(oRouter)
      }
      if (first) {
        if (!this.routerList.includes(aRouter[0][propsDefault.path])) {
          this.safe.$router.addRoutes(aRouter)
          this.routerList.push(aRouter[0][propsDefault.path])
        }
      } else {
        return aRouter
      }
    }
  }
}
export default RouterPlugin
