<template>
  <div class="login-container"
       @keyup.enter.native="handleLogin">
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">

        </div>
        <p class="title">{{ $t('login.info') }}</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            登录
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
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  components: {
    userLogin,
    codeLogin,
    thirdLogin
/*    topLang,
    topColor */
  },
  data () {
    return {
      time: '',
      activeName: 'user'
    }
  },
  watch: {
    $route () {
    }
  },
  created () {
  },
  mounted () {},
  computed: {
    ...mapGetters(['website'])
  },
  props: [],
  methods: {
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/login';
</style>
