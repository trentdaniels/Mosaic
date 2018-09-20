import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import Router from './router'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    currentUser: {
      id: null,
      email: null,
      name: null,
      bio: null,
      isAuthenticated: false
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.currentUser.id && state.currentUser.email ? true : false;
    }
  },
  mutations: {
    getCurrentUser(state, user) {
      state.currentUser.id = user.id;
      state.currentUser.email = user.email;
      state.currentUser.isAuthenticated = true;
    },
    clearUser(state) {
      state.currentUser.id = null;
      state.currentUser.email = null;
      state.currentUser.isAuthenticated = false;
    },
    addInfo(state, user) {
      state.currentUser.name = user.name,
      state.currentUser.bio = user.bio
    }
  },
  actions: {
    clearUser({ commit }) {
      commit("clearUser");
    },
    async signUp({ commit }, createdUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      auth.createUserWithEmailAndPassword(createdUser.email, createdUser.password).then((authUser) => {
        db.collection("users").doc(authUser.user.uid).set({
          type: "Creative",
          id: authUser.user.uid,
          email: createdUser.email,
        }, {merge: true})
        commit('getCurrentUser', {
          id: authUser.user.uid,
          email: authUser.user.email
        })
        Router.replace('getstarted')
      }, (err) => {
          alert(`Oops, ${err.message}`);
        }
      );      
    },
    async logIn({ commit }, loggedInUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      auth.signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password).then((authUser) => {
        db.collection("users").doc(authUser.user.uid).get().then((doc) => {
          commit('getCurrentUser', {
            id: doc.id,
            email: loggedInUser.email
          })
        })
        Router.replace('home')
      }, (err) => {
        alert(`Oops, ${err.message}`)
      })
    },
    async updateUser({state, commit}, user) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      db.collection("users").doc(state.currentUser.id).set({
        name: user.name,
        bio: user.bio
      }, {merge: true}).then(() => {
        commit('addInfo', user)
        Router.replace('home')
      }, (err) => {
        alert(`Oops, ${err.message}`)
      })
      
    }
  }
});
