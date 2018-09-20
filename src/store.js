import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      id: null,
      email: null,
      isAuthenticated: false
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.currentUser.id ? true : false;
    }
  },
  mutations: {
    getUser(state, user) {
      state.currentUser.id = user.uid;
      state.currentUser.email = user.email;
      state.currentUser.isAuthenticated = true;
    },
    clearUser(state) {
      state.currentUser.id = null;
      state.currentUser.email = null;
      state.currentUser.isAuthenticated = false;
    }
  },
  actions: {
    getUser({ commit }, user) {
      commit("getUser", user);
    },
    clearUser({ commit }) {
      commit("clearUser");
    }
  }
});
