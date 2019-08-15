<template>
    <component v-bind:is="decoratorComponent" :decorator="widgetParams.decorator" :widget="widget" :page="page" :i="i"
               :j="j" :editMode="editMode" :params="widgetParams">
        <slot name="header" v-if="$slots.header" slot="header"></slot>
        <slot name="icon" v-if="$slots.icon" slot="icon"></slot>
        <slot name="title" v-if="$slots.title" slot="title"></slot>
        <slot name="buttons" v-if="$slots.buttons" slot="buttons"></slot>
        <div v-if="$slots.default"
             :class="[widgetParams.decorator!='none' ? ('tab' == widget.name || 'nested' == widget.name ? 'other-panel': 'default-panel' ) : 'none-panel']"
             :style="{padding: `${!widgetParams.paddingTop ? '' : widgetParams.paddingTop}px ${!widgetParams.paddingRight ? '' : widgetParams.paddingRight}px ${!widgetParams.paddingBottom ? '' : widgetParams.paddingBottom}px ${!widgetParams.paddingLeft ? '' : widgetParams.paddingLeft}px`,height: page.maximized ? '' : `${widgetParams.widgetHeight}px`}">
            <slot></slot>
        </div>
        <slot name="footer" v-if="$slots.footer" slot="footer"></slot>
    </component>
</template>
<script>
  import Decorators from '../decorators'

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
        let decorator = this.widgetParams.decorator
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
        return this.getWidget(this).$options.propsData.params
      }
    },
    methods: {
      getWidget (node) {
        return (node.$attrs.isWidget) ? node : this.getWidget(node.$parent)
      }
    }
  }
</script>

