<template>
  <component v-bind:is="decoratorComponent" :widget="widget" :params="widgetParams[widget.id]" :decorator="widgetParams[widget.id].decorator" :page="page" :i="i" :j="j" :editMode="editMode">
    <slot name="header" v-if="$slots.header" slot="header"></slot>
    <slot name="icon" v-if="$slots.icon" slot="icon"></slot>
    <slot name="title" v-if="$slots.title" slot="title"></slot>
    <slot name="buttons" v-if="$slots.buttons" slot="buttons"></slot>
    <slot v-if="$slots.default"></slot>
    <slot name="footer" v-if="$slots.footer" slot="footer"></slot>
  </component>
</template>
<script>
  import Decorators from 'decorators'

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
        let decorator = this.widgetParams[this.widget.id].decorator
        let component = this.$store.getters.pageComponents.decorators[decorator]
        if (!component) {
          if (/\//.test(decorator)) {
            component = this.$require(decorator, 'decorator')
          } else {
            component = Decorators[decorator]
          }
          this.$store.dispatch('add_page_component', {
            name: decorator,
            type: 'decorator',
            component
          })
        }
        return component
      },
      widgetParams () {
        return this.$store.getters.page.widgetParams
      }
    }
  }
</script>

