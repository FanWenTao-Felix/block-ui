import Vue from 'vue'
import Vuex from 'vuex'
import site from './site/index'
import user from './global/user'
import common from './global/common'
import tags from './global/tags'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    tags,
    site
  },
  getters
})

export default store
