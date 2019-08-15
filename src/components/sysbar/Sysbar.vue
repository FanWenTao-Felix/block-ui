<template>
  <span class="user-info" v-if="userInfo">
  	<div v-show="showDiv" style="position: fixed;z-index: 3;width: 85%;left: 10%;right: 90%;">
  		<i class="el-icon-error" style="cursor: pointer;position: absolute;top: 7px;right: 4px;z-index: 100;"
           @click="handleClose()"></i>
  		<div ref="dlgRef" style="height: 550px;padding-top: 5px;line-height: 15px;"><p
                style="background: rgb(39, 41, 45);height: 15px;"></p>
  			<iframe ref="iframe1" :src="linkSrc" frameborder="0" framespacing="0" height="100%" width="100%"></iframe>
  		</div>
  	</div>
  	<div style="position: fixed;text-align: center;vertical-align:middle;z-index: 3;width: 85%;left: 10%;right: 90%;"
         v-show='fullscreenLoading'>
			<span class="loading"><i class="el-icon-loading"></i>正在加载......</span>
		</div>
  	<i class="el-icon-news" v-show="false" style="cursor: pointer;" title="div" @click=""></i>&nbsp;&nbsp;&nbsp;
    <i class="el-icon-bell" style="cursor: pointer;" title="即时通讯" @click=""></i>&nbsp;&nbsp;&nbsp;
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="iconfont icon-yonghu"></i> {{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-if="!(editMode || diyMode)" command="changeTheme">切换主题</el-dropdown-item>
          <!--只有系统管理员才显示编辑页面 用户ID：1 系统管理员sn-->
        <el-dropdown-item v-if="!(editMode || diyMode) && userInfo.id == 1" command="edit">编辑页面</el-dropdown-item>
        <el-dropdown-item v-if="!(editMode || diyMode)" command="diy">页面个性化</el-dropdown-item>
        <el-dropdown-item v-if="userInfo.id == 1" command="backPublic">编辑公开页</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog v-show="showDialog" class="dialogClass" size="small" :visible.sync="showIm" :show-close="false"
               :close-on-click-modal="true" @close="" width="85%" top="7vh">
      <div ref="dlgRef" style="height: 550px;"><iframe ref="iframe" :src="linkSrc" frameborder="0" framespacing="0"
                                                       height="100%" width="100%"></iframe></div>
    </el-dialog>
  </span>
    <span class="user-info" v-else>
    <span v-if="site.loginType === 'system' || site.loginType === 'dialog'">
      <el-button type="text" @click="login">登录</el-button>
    </span>
  </span>
</template>
<script>
  export default {
    name: 'sysbar',
    props: ['page'],
    data () {
      return {
        showIm: false,
        linkSrc: '',
        showDialog: false,
        showDiv: false,
        linkImMsgDisabled: false,
        fullscreenLoading: false
      }
    },
    computed: {
      diyMode () {
        return this.$store.getters.diyMode
      },
      editMode () {
        return this.$store.getters.editMode
      },
      site () {
        return this.$store.getters.site
      },
      userInfo () {
        return this.$store.getters.userinfo
      }
    },
    methods: {
      handleCommand: function (command) {
        if (typeof this[command] === 'function') {
          this[command]()
        }
      },
      login: function () {
        if (this.site.loginType === 'system') {
          this.$router.push('/login')
        } else {
          let dialog = {
            title: '登录',
            body: () => import('@/views/login/index.vue'),
            data: {}
          }
          this.$store.dispatch('update_dialog_content', dialog)
        }
      },
      logout: function () {
        this.$api_user_logout({}).then((data) => {
          this.$store.dispatch('update_navs', {
            navs: null,
            subNavs: null
          })
          this.$store.dispatch('remove_userinfo')
          this.$router.push(`/${this.site.name}/public`)
        })
      }
    },
    mounted () {
    },
    created () {
    }
  }
</script>

<style>
    .addPart {
        font-size: 14px;
        margin-right: 25px;
        vertical-align: top;
        cursor: pointer;
    }

    .addPart .iconfont {
        font-size: 16px;
    }

    .dialogClass .el-dialog__header {
        padding: 0;
    }

    .dialogClass .el-dialog__body {
        padding: 0;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
    }

    .header .user-info .el-dropdown {
        display: inline-block;
        position: relative;
        color: #FFFFFF;
        font-size: 14px;
    }

    .header .user-info .el-icon-bell {
        font-size: 14px;
    }

    .header .user-info .icon-yonghu {
        font-size: 14px;
    }
</style>
