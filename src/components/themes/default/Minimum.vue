<template>
    <div class="themes">
        <div class="content">
            <layout :page="page"></layout>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'theme-default',
    props: ['page', 'theme', 'navs', 'subnavs'],
    data () {
      return {}
    },
    computed: {},
    mounted () {
      document.getElementById('_theme_').innerHTML = css.toString()
    }
  }
</script>

<style scoped>
    .themes {
        background: #e8ecf0;
        font-family: "Microsoft YaHei";
        font-size: 12px;
    }

    .content {
        color: #20a0ff;
        display: block;
        padding: 5px;
    }
</style>
