<template>
  <component v-bind:is="widgetComponent" :widget="widget" :params="widgetParams[widget.id]" :page="page" :i="i" :j="j"></component>
</template>
<script>
  import Widgets from 'widgets'

  export default {
    name: 'widget',
    props: ['page', 'widget', 'i', 'j'],
    data () {
      return {}
    },
    computed: {
      widgetComponent () {
        let widget = this.widget
        let component = this.$store.getters.pageComponents.widgets[widget.name]
        if (!component) {
          if (/\//.test(widget.name)) {
            component = this.$require(widget.name, 'widget')
          } else {
            component = Widgets[widget.name].widget
          }
          this.$store.dispatch('add_page_component', {
            name: widget.name,
            type: 'widget',
            component
          })
        }
        return component
      },
      widgetParams () {
        return this.$store.getters.page.widgetParams
      }
    },
    created () {
      this.$store.dispatch('update_widget_created', this.widget.id)
    },
    beforeDestroy () {
      this.$store.dispatch('update_widget_destroyed', this.widget.id)
    }
  }
</script>
