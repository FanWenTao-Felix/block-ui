import {gbs} from '../config'
import {siteInfo} from '@/api/site'

export default function (to, from, next) {
  if (document.domain && !this.$store.getters.site) {
    let site = (to.params && to.params.site) ? to.params.site : gbs.default_site
    // 远程获取站点信息
    return new Promise(resolve => {
      siteInfo(site, document.domain).then((res) => {
        const data = res.data.data
        this.$store.dispatch('update_site', data)
        let type = this.$store.getters.userinfo ? 'private' : 'public'
        if (site !== data.name) {
          if (to.params && to.params.path) {
            next(`/${data.site}/${type}/${to.params.path}`)
          } else {
            next(`/${data.site}/${type}`)
          }
        } else {
          if (to.params && to.params.path) {
            next(`/${site}/${type}/${to.params.path}`)
          } else {
            next(`/${site}/${type}`)
          }
        }
      })
    })
  } else {
    next()
  }
}
