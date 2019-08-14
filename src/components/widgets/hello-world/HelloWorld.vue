<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      Hello World Widget
    </div>
  </decorator>
</template>

<script>
  import Decorator from '@/components/decorator/index'
  export default {
    components: {Decorator},
    name: 'hello-world-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
</style>
