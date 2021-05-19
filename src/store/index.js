import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import admix from './modules/admix'
import channel from './modules/channel'
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    admix,
    permission,
    channel,
    tagsView
  },
  getters
})

export default store
