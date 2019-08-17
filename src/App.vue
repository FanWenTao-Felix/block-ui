<template>
    <div id="app">
      <router-view></router-view>
      <dlgs></dlgs>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {}
    }
  }
</script>
<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
