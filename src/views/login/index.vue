<template>
    <div class="login-container"
         @keyup.enter.native="handleLogin">
        <top-color v-show="false"></top-color>
        <div class="login-weaper animated bounceInDown">
            <div class="login-left">
                <div class="login-time">
                    {{time}}
                </div>
                <img src="./img/logo.png" width="150" alt="">
                <p class="title">{{ $t('login.info') }}</p>
            </div>
            <div class="login-border">
                <div class="login-main">
                    <h4 class="login-title">
                        {{ $t('login.title') }}{{website.title}}
                        <top-lang></top-lang>
                    </h4>
                    <userLogin v-if="activeName==='user'"></userLogin>
                    <codeLogin v-else-if="activeName==='code'"></codeLogin>
                    <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
                    <div class="login-menu">
                        <a href="#"
                           @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>
                        <a href="#"
                           @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>
                        <a href="#"
                           @click.stop="activeName='third'">{{ $t('login.thirdLogin') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import userLogin from './userlogin'
  import codeLogin from './codelogin'
  import thirdLogin from './thirdlogin'
  import {mapGetters} from 'vuex'
  import {dateFormat} from 'util/date'
  import {validatenull} from 'util/validate'
  import topLang from 'views/page/top/top-lang'
  import topColor from 'views/page/top/top-color'

  export default {
    name: 'login',
    components: {
      userLogin,
      codeLogin,
      thirdLogin,
      topLang,
      topColor
    },
    data () {
      return {
        time: '',
        activeName: 'user'
      }
    },
    created () {
      this.getTime()
      setInterval(() => {
        this.getTime()
      }, 1000)
    },
    computed: {
      ...mapGetters(['website'])
    },
    methods: {
      getTime () {
        this.time = dateFormat(new Date())
      }
    },
    watch: {
      $route () {
        const params = this.$route.query
        this.socialForm.state = params.state
        this.socialForm.code = params.code
        if (!validatenull(this.socialForm.state)) {
          const loading = this.$loading({
            lock: true,
            text: `${
              this.socialForm.state === 'WX' ? '微信' : 'QQ'
            }登录中,请稍后。。。`,
            spinner: 'el-icon-loading'
          })
          setTimeout(() => {
            loading.close()
          }, 2000)
        }
      }
    }
  }

</script>

<style lang="scss">
    @import '../../assets/scss/login';
</style>
