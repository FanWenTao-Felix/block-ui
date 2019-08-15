<template>
  <span v-if="editMode">
    <i class="iconfont icon-shanchu4" @click="del" title="删除"></i>
    <slot></slot>
    <i class="iconfont icon-shezhi" @click="settings" :title="title"></i>
  </span>
    <span v-else>
    <slot></slot>
    <i class="iconfont icon-zuidahua" v-if="!page.maximized & !minimized" @click="max" title="最大化"></i>
    <i class="iconfont icon-huanyuan" v-if="page.maximized || minimized" @click="restore" title="还原"></i>
    <i class="iconfont icon-zuixiaohua" v-if="!page.maximized & !minimized" @click="min" title="最小化"></i>
  </span>
</template>

<script>
  export default {
    name: 'decorator-toolbar',
    props: ['page', 'widget', 'i', 'j', 'minimized'],
    data () {
      return {}
    },
    computed: {
      editMode () {
        return this.$store.getters.editMode
      },
      diyMode () {
        return this.$store.getters.diyMode
      },
      widgetParams () {
        return this.$store.getters.page.widgetParams
      },
      title () {
        return this.$store.getters.diyMode ? '偏好设置' : '系统设置'
      },
      rootPage () {
        return this.$store.getters.page
      }
    },
    methods: {
      max: function () {
      },
      min: function () {
      }
    }
  }
</script>
