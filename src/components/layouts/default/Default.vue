<template>
  <port :page="page" :index="0"></port>
</template>

<script>
  import Port from '@/components/port/index'
  export default {
    components: {Port},
    name: 'layout-defaut',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>
