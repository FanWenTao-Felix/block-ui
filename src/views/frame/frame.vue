<template>
    <theme></theme>
</template>

<script>
  import Theme from '@/components/theme'

  export default {
    components: {
      Theme
    },
    name: 'frame',
    data () {
      return {
        path: this.$route.path,
        query: this.$route.query
      }
    },
    computed: {},
    methods: {},
    created () {
    }
  }
</script>
