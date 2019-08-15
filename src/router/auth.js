export default function (to, from, next) {
  if (to.params && to.params.type === 'private' && !this.$store.getters.userinfo) {
    // 用户未登录
    let type = this.$store.getters.site.loginType
    if (type === 'system') {
      next('/login')
    } else if (type === 'public') {
      next(`/${to.params.site}/public`)
    } else if (type === 'dialog') {
      let dialog = {
        title: '登录',
        body: () => import('@/views/login/index.vue'),
        data: {
        }
      }
      this.$store.dispatch('update_dialog_content', dialog)
    } else if (type === 'none') { // 禁用登录验证
      this.$router.push('/notFound')
    } else {
      next()
    }
  } else {
    next()
  }
}