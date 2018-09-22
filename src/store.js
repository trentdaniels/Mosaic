import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import axios from 'axios'
import jsonAdapter from 'axios-jsonp'
import keys from './credentials/keys'
import Router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    apiTargets: [
      'Projects',
      'Articles',
      'Photos'
    ],
    currentSearch: {
      type: null,
      results: []
    },
    isLoading: false
  },
  getters: {
    apis(state) {
      return state.apiTargets
    },
    currentSearch(state) {
      return state.currentSearch
    },
    user(state) {
      return state.user
    },
    isLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addInfo(state, user) {
      state.currentUser.name = user.name,
      state.currentUser.bio = user.bio
    },
    updateSearch(state, inspirations) {
      state.currentSearch.results = []
      state.currentSearch.type = inspirations.type
      inspirations.results.forEach(inspiration => {
        state.currentSearch.results.push(inspiration)
      })
      console.log(state.currentSearch)
    },
    setLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    async clearUser({ commit }) {
      const auth = firebase.auth();
      auth.signOut().then(() => {
        commit('setUser', null);
        Router.replace('home')
      }, (err) =>
      alert(`Oops, ${err.message}`)
      )
    },
    async signUp({ commit }, createdUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      auth.createUserWithEmailAndPassword(createdUser.email, createdUser.password).then((response) => {
        db.collection("users").doc(response.user.uid).set({
          type: "Creative",
          email: createdUser.email,
        }, {merge: true}).then(() => {
          commit('setUser', {
            id: response.user.uid,
            email: createdUser.email
          })
          Router.replace('getstarted')
        }, (err) => {
          alert(`There was a problem setting the database. Details: ${err.message}`)
        })
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

      auth.signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password).then((response) => {
        db.collection("users").doc(response.user.uid).get().then((doc) => {
          commit('setUser', {
            id: doc.id,
            data: doc.data()
          })
          Router.replace('home')
        }, (err) => {
          alert(`Oops, ${err.message}`)
        })
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
      
    },
    async searchProjects({commit}, query) {
      let url;
      switch(query.api) {
        case 0:
          url = `http://behance.net/v2/projects?q=${query.url}&page=1&sort=views&api_key=${keys.BEHANCE_API}`;
          axios.get(url, {
            adapter: jsonAdapter
          }).then((response) => {
            let projects = response.data.projects;
            let filteredProjects = projects.filter((project, index) => {
              return index < 12
            })
            commit('updateSearch', {type: 'project', results: filteredProjects})
          },
          (err) => {
            alert(`Oops, ${err.message}`)
          });
          break;
        case 1:
          url = `https://newsapi.org/v2/everything?q=${query.url}&sortBy=popularity&pageSize=12&apiKey=${keys.NEWS_API}`
          axios.get(url).then((res) => {
            let articles = res.data.articles;
            commit('updateSearch', {type: 'article', results: articles})
          }, (err) => {
            alert(`Oops, ${err.message}`)
          })
          break;
        case 2:  
          url = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${query.url}&orientation=squarish&client_id=${keys.UNSPLASH_API}`
          axios.get(url).then((res) => {
            let photos = res.data.results;
            commit('updateSearch', {type: 'photo', results: photos})
          }, (err) => {
            alert(`Oops, ${err.message}`)
          })
          break;
        default:
          alert('unable to get projects, please try again')
          break;
      }
    },
    editUser({ commit,state }, newUserInfo) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      auth.currentUser.updateEmail(newUserInfo.email).then(() => {
        db.collection('users').doc(state.user.id).set(newUserInfo, {merge: true}).then(() => {
          db.collection('users').doc(state.user.id).get().then((doc) => {
            commit('setUser', {
              id: state.user.id,
              data: doc.data()
            })
            Router.replace('account')
          })
        })
      }, (err) => {
        alert(`Oops, ${err.message}`)
      })
    },
    deleteUser({commit, state}) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      
      db.collection("users").doc(state.currentUser.id).delete().then(() => {
        auth.currentUser.delete().then(() => {
          commit('clearUser')
          Router.replace('home')
        }, (err) => {
          alert(`Oops, There was a problem deleting your info from the database. ${err.message}`)
        })
      }, (err) => {
        alert(`Good News: Your account failed at deleting. The bad news: ${err.message}`)
      })
    }
  }
});
