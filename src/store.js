import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      id : null,
      email: null,
      isAuthenticated: false
    }
    
  },
  mutations: {
    getUser(state, user) {
      state.currentUser.id = user.uid
      state.currentUser.email = user.email
      state.currentUser.isAuthenticated = true
    }
  },
  actions: {
    getUser({commit}, user) {
      commit('getUser', user)
    }
  }
});
