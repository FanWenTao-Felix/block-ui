<template>
    <div>
        <div class="avue-contail"
             :class="{'avue--collapse':isCollapse}">
            <div class="avue-header">
                111
                <!-- 顶部导航栏 -->
            </div>
            <div class="avue-layout">
                <div class="avue-left">
                    <sidebar/>
                    <!-- 左侧导航栏 -->
                </div>
                <div class="avue-main">
                    333
                    <!-- 顶部标签卡 -->
                    <!-- 主体视图层 -->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import sidebar from './sidebar/'

  export default {
    components: {
      sidebar
    },
    name: 'index',
    data () {
      return {}
    },
    created () {
    },
    computed: mapGetters(['isCollapse']),
    methods: {}
  }
</script>
