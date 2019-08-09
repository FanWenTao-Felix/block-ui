<template>
    <div>
        <div class="avue-contail"
             :class="{'avue--collapse':isCollapse}">
            <div class="avue-header">
                <top/>
                <!-- 顶部导航栏 -->
            </div>
            <div class="avue-layout">
                <div class="avue-left">
                    <sidebar/>
                    <!-- 左侧导航栏 -->
                </div>
                <div class="avue-main">
                    <!-- 顶部标签卡 -->
                    <!-- 主体视图层 -->
                    <el-scrollbar style="height:100%">
                        <keep-alive>
                            <router-view class="avue-view"
                                         v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view class="avue-view"
                                     v-if="!$route.meta.keepAlive"></router-view>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="avue-shade" @click="showCollapse"></div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import sidebar from './sidebar/'
  import top from './top/'

  export default {
    components: {
      top,
      sidebar
    },
    name: 'index',
    data () {
      return {}
    },
    created () {
    },
    computed: mapGetters(['isCollapse']),
    methods: {
      showCollapse () {
      }
    }
  }
</script>
