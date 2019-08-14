<template>
    <div>
        <component v-bind:is="themeComponent" :theme="theme" :navs="navs" :subnavs="subnavs"
                   :page="page" :site="site"></component>
    </div>
</template>
<script>
  import Themes from '../themes'

  export default {
    name: 'theme',
    data () {
      return {}
    },
    computed: {
      site () {
        return this.$store.getters.site
      },
      theme () {
        return this.$store.getters.theme
      },
      page () {
        return this.$store.getters.page
      },
      navs: function () {
        let navs = this.$store.getters.navs
        if (navs) {
          return navs
        }
      },
      subnavs: function () {
        return this.$store.getters.subnavs
      },
      editMode () {
        return this.$store.getters.editMode
      },
      diyMode () {
        return this.$store.getters.diyMode
      },
      confMode () {
        return this.$store.getters.confMode
      },
      themeComponent () {
        console.log('1123', this.$store.getters.sites)
        return 123
      }
    }
  }
</script>

<style scoped>
</style>
