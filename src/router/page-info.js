export default function (to, from, next) {
  this.path = to.path
  this.$store.dispatch('update_page_edit_mode', to.query.hasOwnProperty('edit'))
  this.$store.dispatch('update_page_diy_mode', false)
  let data = {
    path: this.path
  }
  if (to.query.hasOwnProperty('edit')) {
    data.default = true
  }
  this.$api_site_pageInfo({
    data,
    fn: (data) => {
      document.title = data.title
      data.path = this.path || ''
      this.$store.dispatch('update_page', data)
      // this.$store.dispatch('update_widget_original')
      next()
    }
  })
}
