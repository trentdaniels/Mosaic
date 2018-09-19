import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      isAuthenticated: false
    }
    
  },
  mutations: {
    authenticate(context) {
      context.commit()
    }
  },
  actions: {}
});
