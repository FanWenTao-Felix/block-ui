export default function (to, from, next) {
  this.path = to.path
  this.$api_site_pageInfo.then((res) => {
    const data = res.data.data
    document.title = data.title
    data.path = this.path || ''
    this.$store.dispatch('update_page', data)
    next()
  })
}
