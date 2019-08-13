<template>
  <el-badge v-if="dataBadge || badge" :max="99" :is-dot="dataBadge ? dataBadge.isDot : badge.isDot" :value="dataBadge ? dataBadge.value : badge.value">
    <slot></slot>
  </el-badge>
  <span v-else>
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: 'badge',
  props: ['name', 'data'],
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    badge () {
      if (this.name) {
        return this.$store.getters.badge(this.name)
      }
    },
    dataBadge () {
      if (this.data && this.data.badgeNames) {
        return this.$store.getters.badge(this.data.badgeNames)
      }
    }
  }
}
</script>
