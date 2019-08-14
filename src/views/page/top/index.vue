<template>
    <div class="avue-top">
        <div class="top-bar__left">
            <div class="avue-breadcrumb"
                 :class="[{ 'avue-breadcrumb--active': isCollapse }]"
                 v-if="showCollapse">
                <i class="iconfont icon-cf-c57"
                   @click="setCollapse"></i>
            </div>
        </div>
        <div class="top-bar__title">
            <div class="top-bar__item top-bar__item--show"
                 v-if="showMenu">
                <top-menu></top-menu>
            </div>
            <span class="top-bar__item"
                  v-if="showSearch">
          </span>
        </div>
    </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import topMenu from './top-menu'
  import topTheme from './top-theme'

  export default {
    components: {
      topMenu,
      topTheme
    },
    name: 'top',
    data () {
      return {}
    },
    created () {
    },
    mounted () {
    },
    computed: {
      ...mapState({
        showCollapse: state => state.common.showCollapse,
        showSearch: state => state.common.showSearch,
        showMenu: state => state.common.showMenu
      }),
      ...mapGetters([
        'isCollapse'
      ])
    },
    methods: {
      setCollapse () {
        this.$store.commit('SET_COLLAPSE')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
