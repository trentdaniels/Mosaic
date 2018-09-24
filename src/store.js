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
    async signUp({ dispatch }, createdUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      auth.createUserWithEmailAndPassword(createdUser.email, createdUser.password).then((response) => {
        db.collection("users").doc(response.user.uid).set({
          type: "Creative",
          email: createdUser.email,
          name: createdUser.name,
          bio: createdUser.bio
        }, {merge: true}).then(() => {
          dispatch('getUser', response.user.uid)
          Router.replace('home')
        }, (err) => {
          alert(`There was a problem setting the database. Details: ${err.message}`)
        })
      }, (err) => {
          alert(`Oops, ${err.message}`);
        }
      );      
    },
    async logIn({ dispatch }, loggedInUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      auth.signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password).then((response) => {
          dispatch('getUser', response.user.uid)
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
    editUser({ dispatch ,state }, newUserInfo) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      auth.currentUser.updateEmail(newUserInfo.email).then(() => {
        db.collection('users').doc(state.user.id).set(newUserInfo, {merge: true}).then(() => {
            dispatch('getUser', state.user.id)
            Router.replace('account')
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
      
      db.collection("users").doc(state.user.id).delete().then(() => {
        auth.currentUser.delete().then(() => {
          commit('clearUser')
          Router.replace('home')
        }, (err) => {
          alert(`Oops, There was a problem deleting your info from the database. ${err.message}`)
        })
      }, (err) => {
        alert(`Good News: Your account failed at deleting. The bad news: ${err.message}`)
      })
    },
    async getUser({commit}, id) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      let queriedProjects = [];
      let queriedArticles = [];
      let queriedPhotos = [];
      let queriedCollections = [];
      db.collection('projects').where('userId', '==', id).get().then((snapShot) => snapShot.forEach((doc) => queriedProjects.push(doc.data())));
      db.collection('articles').where('userId', '==', id).get().then((snapShot) => snapShot.forEach((doc) => queriedArticles.push(doc.data())));
      db.collection('photos').where('userId', '==', id).get().then((snapShot) => snapShot.forEach((doc) => queriedPhotos.push(doc.data())));
      db.collection('collections').where('userId', '==', id).get().then((snapShot) => snapShot.forEach((doc) => queriedCollections.push(doc.data())));


      db.collection("users").doc(id).get().then((doc) => {
        commit('setUser', {
          id: doc.id,
          data: doc.data(),
          collections: queriedCollections,
          projects: queriedProjects,
          articles: queriedArticles,
          photos: queriedPhotos
        })
      }, (err) => {
        alert(`Oops, ${err.message}`)
      })
    },
    async addProject({dispatch, state}, collectionDetails) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      let collectionArray = [];
      let collectionToAdd;
      db.collection('collections').where('name', '==', collectionDetails.collection).where('userId', '==', state.user.id).limit(1).get().then((snapShot) => {
        snapShot.forEach((doc) => {
          collectionArray.push({
            id: doc.id,
          })
        })
        collectionToAdd = collectionArray[0].id

        switch(collectionDetails.project.type) {
          case 'project':
            db.collection('projects').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            },(err) => alert(`Oops, ${err.message}`))
            break;
          case 'article':
            db.collection('articles').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            }, (err) => alert(`Oops, ${err.message}`))
            break;
          case 'photo':
            db.collection('photos').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            }, (err) => alert(`Oops, ${err.message}`))
            break;
          default: 
            alert('Oops, there was an error adding to your collection. Please try again')
            break;
        }
      })
      
      
    },
    async createNewCollection({dispatch , state}, collectionDetails) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      
      switch(collectionDetails.data.type) {
        case 'project':
          db.collection('collections').add({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then((doc) => {
            db.collection('projects').add({
              collectionId: doc.id,
              userId: state.user.id,
              data: collectionDetails.data.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            })
          })
          break;
        case 'article':
          db.collection('collections').add({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then((doc) => {
            db.collection('articles').add({
              collectionId: doc.id,
              userId: state.user.id,
              data: collectionDetails.data.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            })
          })
          break;
        case 'photo':
          db.collection('collections').add({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then((doc) => {
            db.collection('photos').add({
              collectionId: doc.id,
              userId: state.user.id,
              data: collectionDetails.data.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            })
          })
          break;
        default: 
          alert('Oops, there was a problem adding to that collection. Please try again')
          break;
      }
    }
  }
});
