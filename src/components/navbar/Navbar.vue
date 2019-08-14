<template>
  <el-menu
    :default-active="topNav"
    class="el-menu-demo nav"
    mode="horizontal"
    :background-color="themeColor.backgroundColor"
    :text-color="themeColor.textColor"
    :active-text-color="themeColor.activeTextColor"
    :router="true">
    <template v-for="item in navs" v-if="!item.hidden">
      <el-submenu :index="item.path" :key="item.path" v-if="item.submenu">
        <!--用el ui 的title进行solt分发菜单-->
        <template slot="title"><i :class="item.iconCls" v-if="!item.iconCls && item.iconCls != ''"></i><badge :data="item" class="item">{{item.title}}</badge></template>
        <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->
        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.title}}<badge class="mark" :data="child"></badge></el-menu-item>
      </el-submenu>
      <el-menu-item class="first-menu" v-if="!item.submenu" :index="item.path" :key="item.path"><i :class="item.iconCls" v-if="!item.iconCls && item.iconCls != ''"></i><badge :data="item" class="item">{{item.title}}</badge></el-menu-item>
    </template>
  </el-menu>
</template>
<script>
  import badge from '@/components/badge/index'
  export default {
    components: {badge},
    name: 'navbar',
    props: ['page', 'navs'],
    data () {
      return {
        themeColor: {
          backgroundColor: '#0070c1',
          textColor: '#eee',
          activeTextColor: '#6fc0fc'
        }
      }
    },
    computed: {
      topNav () {
        return this.$store.getters.topNav
      },
      site () {
        return this.$store.getters.site
      }
    },
    created () {}
  }
</script>

<style scoped>
  >>> .el-badge__content{border: none;}
  >>> .el-submenu__title i {
     color: #fff;
    }
  >>> .el-badge__content.is-fixed{
    top:18px;
    right:4px;
  }
  .mark{float: right;}
  >>> .el-menu--horizontal{border-bottom: none;}
  >>> .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom-width: 4px;
  }
  .is-opened >>> .el-submenu__title .el-badge__content {
    display: none;
  }
</style>
