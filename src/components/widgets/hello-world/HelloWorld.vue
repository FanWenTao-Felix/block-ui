<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      Hello World Widget
    </div>
  </decorator>
</template>

<script>
  export default {
    name: 'hello-world-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data () {
      return {
      }
    },
    created () {
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
</style>
