import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    containerStyle: {
      height: `calc(100% - ${60}px)`
    }
  },
  getters: {
    containerStyle (state) {
      return state.containerStyle
    }
  },
  mutations: {

  },
  actions: {

  }
})
