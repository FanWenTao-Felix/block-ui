import * as types from './mutations_types'

export default {
  [types.UPDATE_USERINFO] (state, userDb) {
    state.userinfo = userDb.userinfo
    // storage.set('userinfo', state.userinfo)
    // cookie.setCookie('userinfo', JSON.stringify(state.userinfo))
  },

  [types.REMOVE_USERINFO] (state) {
    // storage.remove('userinfo')
    // cookie.delCookie('userinfo')
    state.userinfo = null
  }
}
