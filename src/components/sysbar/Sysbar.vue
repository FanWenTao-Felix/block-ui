<template>
  <span class="user-info" v-if="userInfo">
    <div style="position: fixed;text-align: center;vertical-align:middle;z-index: 3;width: 85%;left: 10%;right: 90%;"
         v-show='fullscreenLoading'>
      <span class="loading"><i class="el-icon-loading"></i>正在加载......</span>
  </div>
  <im v-if="site.openIm"><i class="iconfont icon-xiaoxi1" title="即时通讯" @click="linkImMsg"></i></im>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
        <i class="iconfont icon-yonghu"></i> {{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-if="!(editMode || diyMode) && filterShow()" command="changeTheme">切换主题</el-dropdown-item>
      <!--只有系统管理员才显示编辑页面 用户ID：1 系统管理员sn-->
      <el-dropdown-item v-if="!(editMode || diyMode) && userInfo.id == 1 && !confMode" command="edit">编辑页面</el-dropdown-item>
      <el-dropdown-item v-if="!(editMode || diyMode) && /\/private/.test(this.$route.path) && !confMode && filterShow()" command="diy">个性化页面</el-dropdown-item>
      <el-dropdown-item v-if="!(editMode || diyMode) && /\/private/.test(this.$route.path) && filterShow()" command="diyMenu">个性化菜单</el-dropdown-item>
      <el-dropdown-item command="backToPage" v-if="filterShow()">{{editTitle}}</el-dropdown-item>
      <el-dropdown-item v-if="userInfo.id == 1" command="backConsole">控制台</el-dropdown-item>
      <el-dropdown-item v-if="(page.pageHelp!='')" command="helpView">帮助</el-dropdown-item>
      <el-dropdown-item command="changePsd">修改密码</el-dropdown-item>
      <el-dropdown-item v-if="userInfo.id == 1" command="savePageTemp">保存为模版</el-dropdown-item>
      <el-dropdown-item command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dialog v-show="showDialog" id="dialogClass" size="small" :visible.sync="showIm" :show-close="false" :close-on-click-modal="true" @close="closeDialog" width="85%" top="7vh">
    <div ref="dlgRef" style="height: 550px;"><iframe ref="iframe" :src="linkSrc" frameborder="0" framespacing="0" height="100%" width="100%"></iframe></div>
  </el-dialog>
  </span>
  <span class="user-info" v-else>
    <span v-if="site.loginType === 'system' || site.loginType === 'dialog'">
      <span class="login" @click="login">登录</span>
  </span>
  </span>

</template>
<script>
  import { gbs } from 'config'
  export default {
    name: 'sysbar',
    props: ['page'],
    data() {
      return {
        showIm: false,
        linkSrc: '',
        showDialog: false,
        fullscreenLoading: false,
        helpData: {},
        editTitle: ''
      }
    },
    computed: {
      diyMode() {
        return this.$store.getters.diyMode
      },
      editMode() {
        return this.$store.getters.editMode
      },
      confMode () {
        return this.$store.getters.confMode
      },
      site() {
        return this.$store.getters.site
      },
      userInfo() {
        return this.$store.getters.userinfo
      }
    },
    methods: {
      filterShow() {
        if (this.userInfo.id == 1) {
          return true
        } else {
          return this.site.openDiyMenu
        }
      },
      handleCommand: function(command) {
        if(typeof this[command] == 'function') {
          this[command]()
        }
      },
      login: function() {
        if(this.site.loginType === 'system') {
          this.$router.push('/login')
        } else {
          let dialog = {
            title: '',
            width: '450px',
            height: '400px',
            'show-close': true
              // import('views/login/DialogLogin.vue'),
          }
          this.$dialog(dialog)
        }
      },
      changePsd: function() { // 修改密码
        let options = {
          title: '修改密码',
          width: '700px',
          data: {
            userInfo: this.userInfo
          },
          body: () => import('views/settings/ChangePwd'),
          buttons: [{
            text: '取消',
            handle: function(options, dlg) {
              dlg.close()
            }
          }, {
            type: 'primary',
            text: '确定',
            handle: function(options, dlg) {
              let form = dlg.$refs.body.passwordInfo
              dlg.$refs.body.$refs.passwordInfo.validate((valid) => {
                if(valid) {
                  dlg.$refs.body.$api_user_modifyPassword({
                    data: form
                  }).then(res => {
                    dlg.close()
                    dlg.$refs.body.$message({
                      'message': '修改成功！',
                      'type': 'success'
                    })
                    // 返回登录页面
                    this.login()
                  }).catch(err => {
                    console.info(err)
                  }).finally(() => {})
                } else {
                  dlg.$message('请确认表单是否填写完整！');
                }
              });
            }
          }]
        }
        this.$dialog(options)
      },
      logout: function() {
        this.$api_user_logout({
          method: 'post',
        }).then(data => {
          this.$store.dispatch('update_navs', {
            navs: null,
            subNavs: null
          })
          this.$store.dispatch('remove_userinfo')
          this.$router.push(`/${this.site.name}/public`)
        })
      },
      backToPage: function() { // 返回公开页 or 私有页面
        if(/\/private/.test(this.$route.path)) {
          this.$router.push(`/${this.site.name}/public`)
        } else {
          this.$router.push(`/${this.site.name}/private`)
        }
      },
      backConsole: function() { // 控制台
        var param = '?userName=' + this.userInfo.username
        let win = window.open(unescape(gbs.admin_host + param), '_blank')
      },
      diy: function() {
        this.$store.dispatch('update_widget_original')
        this.$store.dispatch('update_page_edit_mode', true)
        this.$store.dispatch('update_page_diy_mode', true)
      },
      diyMenu: function() { // 个性化菜单
        let dlg = this
        this.$dialog({
          title: '个性化菜单',
          width: '100%',
          heigth: '100%',
          'fullscreen': true,
          body: () =>
            import('views/diypage/DiyPage'),
          onclosed(options, dialog, body) { // 当弹出窗口被关闭后调用
            this.$store.dispatch('update_navs', {
              navs: null,
              subNavs: null
            })
            this.$router.push(`/${this.site.name}/private`)
          },
          data: {
            page: this.page
          }
        })
      },
      changeTheme: function() {
        this.$store.dispatch('update_widget_original')
        this.$dialog({
          title: '切换主题',
          width: '640px',
          'close-on-click-modal': true,
          body: () => import('views/profile/ThemeList'),
          data: {}
        })
      },
      edit: function() {
        this.$store.dispatch('update_widget_original')
        // 切换页面
        this.$api_site_pageInfo({
          data: {
            path: this.page.path,
            isDefault: true
          },
          fn: (data) => {
            data.path = this.page.path
            this.$store.dispatch('update_page', data).then(() => {
              this.$store.dispatch('update_page_edit_mode', true)
              this.$store.dispatch('update_page_diy_mode', false)
            })
          }
        })
      },
      addWidget: function() {
        this.$dialog({
          title: '部件清单',
          comp: () =>
            import('views/profile/WidgetList'),
          visible: true,
          'close-on-click-modal': false,
          data: {
            path: this.page.path
          }
        })
      },
      linkImMsg: function() {
        if(this.$refs.iframe) {
          this.showIm = true
          this.showDialog = true
          this.$refs.iframe.contentWindow.postMessage("showImDialog", gbs.im_host)
        } else {
          //打开即时消息服务
          this.setCookie('electron', 'open');
          this.showIm = true
          this.showDialog = true
          var imUrl = gbs.im_host
          this.linkSrc = imUrl + '?userId=' + this.userInfo.id + '&time=' + new Date().getTime()
        }
      },
      setCookie: function(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        window.document.cookie = c_name + "=" + escape(value) +
          ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
      },
      closeDialog: function() {
        this.$refs.iframe.contentWindow.postMessage("noShowImDialog", gbs.im_host)
      },
      helpView: function() { //帮助页面
        // this.helpData = this.page.pageHelp[0]
        this.openHelpDlg(11)
      },
      openHelpDlg(helpData) {
        let dlg = this
        let body = require('./help-view/help.vue')
        let title = '使用指南'
        let options = {
          title: title,
          width: '700px',
          body: body.default,
          data: {
            helpData: helpData
          },
          'before-close': function(done) {
            done()
          },
          buttons: [{
            text: '关闭',
            handle: function(options, dlg) {
              dlg.close()
            }
          }]
        }
        this.$dialog(options)
      },
      savePageTemp: function() {// 保存为模版
        let dlg = this
        let title = '保存为模版'
        let options = {
          title: title,
          width: '600px',
          data: {
            page: dlg.page
          },
          'before-close': function(done) {
            done()
          },
          buttons: [{
            text: '取消',
            handle: function(options, dlg) {
              dlg.close()
            }
          },
            {
              type: 'primary',
              text: '确定',
              handle: function(options, dlg) {
                let form = dlg.$refs.body.form
                dlg.$refs.body.$refs.form.validate((valid) => {
                  if(valid) {
                    form.json = JSON.stringify(this.page)
                    dlg.$refs.body.$api_site_savePageTemp({
                      data: form
                    }).then(res => {
                      dlg.$message({
                        'message': '保存成功！',
                        'type': 'success'
                      })
                      dlg.close()
                    }).catch(err => {
                      console.info(err)
                      dlg.$message({
                        type: 'error',
                        message: '保存失败!'
                      })
                    }).finally(() => {
                    })
                  }
                })
              }
            }]
        }
        this.$dialog(options)
      }
    },
    watch: { // 监听页面path，动态更新是返回私有页面还是公开页面
      page: {
        handler(newVal, oldVal) {
          if(/\/private/.test(newVal.path)) {
            this.editTitle = '返回公开页'
          } else {
            this.editTitle = '返回私有页'
          }
        },
        deep: true
      }
    },
    mounted() {
      if(/\/private/.test(this.page.path)) {
        this.editTitle = '返回公开页'
      } else {
        this.editTitle = '返回私有页'
      }
    },
    created() {
    }
  }
</script>

<style scoped="scoped">
  .addPart {
    font-size: 14px;
    margin-right: 25px;
    vertical-align: top;
    cursor: pointer;
  }

  .addPart .iconfont {
    font-size: 16px;
  }

  #dialogClass >>>.el-dialog__header {
    padding: 0;
  }

  #dialogClass >>>.el-dialog__body {
    padding: 0;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }

  .user-info {
    overflow: hidden;
  }

  .user-info .icon-xiaoxi1 {
    font-size: 15px;
    cursor: pointer;
    display: inline-block;
    margin-right: 25px;
  }

  .user-info .icon-yonghu {
    font-size: 14px;
  }

  .el-dropdown {
    display: inline-block;
  }

  .login {
    font-size: 14px;
    cursor: pointer;
  }
</style>
