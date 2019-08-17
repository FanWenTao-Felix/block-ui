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
      page(){
        return this.$store.getters.page
      },
      editMode() {
        return this.$store.getters.editMode
      },
      diyMode() {
        return this.$store.getters.diyMode
      },
      widgets() {
        let page = this.$store.getters.page
        if(page) {
          return page.widgets
        }
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
    methods: {},
    created () {
    }
  }
</script>
