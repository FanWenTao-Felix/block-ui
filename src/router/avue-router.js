
let RouterPlugin = function () {
  this.$router = null
  this.$store = null
}
RouterPlugin.install = function (vue, router, store, i18n) {
  this.$router = router
  this.$store = store
  // eslint-disable-next-line new-cap
  this.$vue = new vue({ i18n })
  function isURL (s) {
    return /^http[s]?:\/\/.*/.test(s)
  }
  function objToform (obj) {
    let result = []
    Object.keys(obj).forEach(ele => {
      result.push(`${ele}=${obj[ele]}`)
    })
    return result.join('&')
  }
  this.$router.$avueRouter = {
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
        const translatedTitle = this.$vue.$t('route.' + key)

        return translatedTitle
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
    }
  }
}
export default RouterPlugin
