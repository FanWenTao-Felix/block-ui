export default function (to, from, next) {
  this.path = to.path
  this.$api_site_pageInfo({
    fn: (data) => {
      document.title = data.title
      data.path = this.path || ''
      this.$store.dispatch('update_page', data)
      next()
    }
  })
}
