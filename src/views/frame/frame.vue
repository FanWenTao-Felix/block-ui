<template>
    <theme></theme>
</template>

<script>
  export default {
    name: 'frame',
    data () {
      return {
        path: this.$route.path,
        query: this.$route.query
      }
    },
    computed: {
      widgets() {
        let page = this.$store.getters.page
        if(page) {
          return page.widgets
        }
      },
      editMode() {
        return this.$store.getters.editMode
      },
      diyMode() {
        return this.$store.getters.diyMode
      },
      page(){
        return this.$store.getters.page
      },
      createdWidgets() {
        return this.$store.getters.createdWidgets
      },
      dragWidget() {
        return this.$store.getters.dragWidget
      },
      delWidgets() {
        return this.$store.getters.delWidgets
      }
    },
  }
</script>
