<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'decorator',
    props: ['page', 'widget', 'i', 'j'],
    data () {
      return {}
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      },
      decoratorComponent () {
      },
      widgetParams () {
        return this.$store.getters.page.widgetParams
      }
    }
  }
</script>

