import Vue from 'vue'
import Vuex from 'vuex'
import site from './site/index'
import user from './user/index'
import global from './global/index'
import common from './other/common'
import tags from './other/tags'
import xx from './other/user'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    global,
    site,
    user,
    common,
    tags,
    xx
  },
  getters
})

export default store
