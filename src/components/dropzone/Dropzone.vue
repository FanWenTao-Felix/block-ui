<template>
  <div class="dropzone" :class="{'drag-hover': hover}" @dragleave="dragleave($event)" @dragover="dragover($event)" @drop='drop($event)'></div>
</template>
<script>
  export default {
    name: 'dropzone',
    props: ['page', 'i', 'j'],
    data () {
      return {
        hover: false
      }
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      },
      rootPage () {
        return this.$store.getters.page
      }
    },
    methods: {
      drop: function (event) {
        let data = this.$store.getters.dragWidget
        this.$store.dispatch('update_drag_widget', null)
        this.$store.dispatch('update_widget', {
          rootPage: this.rootPage,
          page: this.page,
          i: this.i,
          j: this.j,
          widget: data.widget,
          params: data.params
        })
      },
      dragover: function (event) {
        if (this.editMode) {
          event.preventDefault()
        }
        this.hover = true
      },
      dragleave: function (event) {
        this.hover = false
      }
    }
  }
</script>

<style scoped>
  .dropzone {
    border: 1px dashed #ededed;
    margin-top: -8px;
    height: 6px;
    margin-bottom: 2px;
    margin-right: 10px;
  }
  .drag-hover{
    border: 1px solid #ededed;
    background-color: darkgrey;
  }
</style>
