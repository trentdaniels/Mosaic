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
    isLoading: false,
    currentCollection: null,
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
    },
    currentCollection(state) {
      return state.currentCollection
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
    setLoading(state, value) {
      state.isLoading = value.value
    },
    setCollection(state, collection) {
      state.currentCollection = collection
    },
  },
  actions: {
    async clearUser({ commit }) {
      const auth = firebase.auth();
      try {
        await auth.signOut()
        commit('setUser', null)
        Router.replace('/home')
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
    },
    async changeLoading({ commit }, value) {
      commit('setLoading', value)
    },
    async signUp({ dispatch }, createdUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      try {
        let response = await auth.createUserWithEmailAndPassword(createdUser.email, createdUser.password)
        await db.collection("users").doc(response.user.uid).set({
            type: "Creative",
            email: createdUser.email,
            name: createdUser.name,
            bio: createdUser.bio
        }, {merge: true})
        await dispatch('getUser', response.user.uid)
        Router.push('/home')
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
    },
    async logIn({ dispatch }, loggedInUser) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const auth = firebase.auth();

      try {
        let response = await auth.signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        dispatch('getUser', response.user.uid)
        Router.push('/home')
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
      
    },
    async searchProjects({commit, dispatch}, query) {
      let url;
      await dispatch('changeLoading', {value: true})
      switch(query.api) {
        case 0:
          url = `http://behance.net/v2/projects?q=${query.url}&page=1&sort=views&api_key=${keys.BEHANCE_API}`;
          try {
            let response = await axios.get(url, { adapter: jsonAdapter})
            let projects = response.data.projects
            let filteredProjects = projects.filter((project, index) => {
              return index < 12
            })
            commit('updateSearch', {type: 'project', results: filteredProjects})
          } catch(err)  {
            alert(`Oops, ${err.message}`)
          }
          break;
        case 1:
          url = `https://newsapi.org/v2/everything?q=${query.url}&sortBy=popularity&pageSize=12&apiKey=${keys.NEWS_API}`
          try {
            let res = await axios.get(url)
            let articles = res.data.articles
            commit('updateSearch', {type: 'article', results: articles})
          } catch(err) {
            alert(`Oops, ${err.message}`)
          }
          break;
        case 2:  
          url = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${query.url}&orientation=squarish&client_id=${keys.UNSPLASH_API}`
          try {
            let res = await axios.get(url)
            let photos = res.data.results
            commit('updateSearch', {type: 'photo', results: photos})
          } catch(err) {
            alert(`Oops, ${err.message}`)
          }
          break;
        default:
          alert('unable to get projects, please try again')
          break;
      }
      dispatch('changeLoading', {value: false})
    },
    async editUser({ dispatch ,state }, newUserInfo) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      try {
        auth.currentUser.updateEmail(newUserInfo.email)
        await db.collection('users').doc(state.user.id).set(newUserInfo, {merge: true})
        dispatch('getUser', state.user.id)
        Router.push('/account')
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
      
    },
    async deleteUser({commit, state}) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      
      try {
        await db.collection('users').doc(state.user.id).delete()
        await auth.currentUser.delete()
        commit('setUser', null)
        Router.push('/home')
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
    },
    async getUser({commit, dispatch}, id) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      let credentials = {id: id, db: db}

      let queriedProjects = dispatch('getProjects', credentials)
      let queriedArticles =  dispatch('getArticles', credentials);
      let queriedPhotos =  dispatch('getPhotos', credentials);
      let queriedCollections =  dispatch('getCollections', credentials);
      let queriedCreations =  dispatch('getCreations', credentials)
      
      try {
        const results = await Promise.all([queriedProjects, queriedArticles, queriedPhotos, queriedCollections, queriedCreations])
        let doc = await db.collection("users").doc(id).get()
        commit('setUser', {
          id: doc.id,
          data: doc.data(),
          projects: results[0],
          articles: results[1],
          photos: results[2],
          collections: results[3],
          creations: results[4]
        })
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
      
    },
    async getProjects({} , credential) {
      let queriedProjects = [];
      let snapShot = await credential.db.collection('projects').where('userId', '==', credential.id).get()
      snapShot.forEach((doc) => {
        queriedProjects.push(doc.data())
      })
      return queriedProjects
    },
    async getArticles({}, credential) {
      
      let queriedArticles = [];
      let snapShot = await credential.db.collection('articles').where('userId', '==', credential.id).get()
      snapShot.forEach((doc) => {
        queriedArticles.push(doc.data())
      })
      return queriedArticles
    },
    async getPhotos({}, credential) {
      let queriedPhotos = [];
      let snapShot = await credential.db.collection('photos').where('userId', '==', credential.id).get()
      snapShot.forEach((doc) => {
        queriedPhotos.push(doc.data())
      })
      return queriedPhotos
    },
    async getCollections({}, credential) {

      let queriedCollections = [];
      let snapShot = await credential.db.collection('collections').where('userId', '==', credential.id).get()
      snapShot.forEach((doc) => {
        queriedCollections.push(doc.data())
      })
      return queriedCollections
    },
    async getCreations({}, credential) {
      
      let queriedCreations = [];
      let snapShot = await credential.db.collection('creations').where('userId', '==', credential.id).get()
      snapShot.forEach((doc) => {
        queriedCreations.push(doc.data())
      })
      return queriedCreations
    },
    async addProject({dispatch, state}, collectionDetails) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      let collectionArray = [];
      let collectionToAdd;
      try {
        let snapShot = await db.collection('collection').where('name', '==', collectionDetails.collection).where('userId', '==', state.user.id).limit(1).get()
        await snapShot.forEach((doc) => {
          collectionArray.push({id: doc.id})
        })
        collectionToAdd = collectionArray[0].id
        switch(collectionDetails.project.type) {
          case 'project':
            await db.collection('projects').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            })
            dispatch('getUser', state.user.id)
            break;
          case 'article':
            await db.collection('articles').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            })
            dispatch('getUser', state.user.id)
            break;
          case 'photo':
            await db.collection('photos').add({
              collectionId: collectionToAdd,
              userId: state.user.id,
              data: collectionDetails.project.data
            })
            dispatch('getUser', state.user.id)
            break;
          default: 
            alert('Oops, there was an error adding to your collection. Please try again')
            break;
        }
      } catch(err) {
        alert(`Oops, ${err.message}`)
      }
    },
    async createNewCollection({dispatch , state}, collectionDetails) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      
      switch(collectionDetails.data.type) {
        case 'project':
          db.collection('collections').doc(collectionDetails.name).set({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then(() => {
            db.collection('projects').add({
              collectionId: collectionDetails.name,
              userId: state.user.id,
              data: collectionDetails.data.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            })
          })
          break;
        case 'article':
          db.collection('collections').doc(collectionDetails.name).set({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then(() => {
            db.collection('articles').add({
              collectionId: collectionDetails.name,
              userId: state.user.id,
              data: collectionDetails.data.data
            }).then(() => {
              dispatch('getUser', state.user.id)
            })
          })
          break;
        case 'photo':
          db.collection('collections').doc(collectionDetails.name).set({
            userId: state.user.id,
            name: collectionDetails.name,
          }).then(() => {
            db.collection('photos').add({
              collectionId: collectionDetails.name,
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
    },
    getProjectsByCollection({commit, state}, collectionName) {
      let projects = state.user.projects.filter((project) => {
        return project.collectionId === collectionName
      })
      if (projects === null) {
        projects = []
      }
      let articles = state.user.articles.filter((article) => {
        return article.collectionId === collectionName
      })
      if (articles === null) {
        articles = []
      }
      let photos = state.user.photos.filter((photo) => {
        return photo.collectionId === collectionName
      })
      if (photos === null) {
        photos = []
      }
      commit('setCollection', {projects: projects, articles: articles, photos: photos})
    },
    createProject({commit, state, dispatch}, newProject) {
      console.log(newProject)
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const storage = firebase.storage();
      let storageRef = storage.ref()
      let projectRef = storageRef.child(`${state.user.id}/${newProject.name}.jpg`)
      projectRef.put(newProject.file).then((snapShot) => {
        snapShot.ref.getDownloadURL().then((downloadUrl) => {
          db.collection('creations').doc(newProject.name).set({
            name: newProject.name,
            description: newProject.description,
            category: newProject.category,
            image: downloadUrl,
            userId: state.user.id
          }).then(() => {
            dispatch('getUser', state.user.id)
            Router.push('/account/creations')
          }, (err) => {
            alert(`Oops, ${err.message}`)})
        }, (err) => {
          alert(`Oops, ${err.message}`)
        })
      }, (err) => {
        alert(`Oops, ${err.message}`)
      })
    }
  }
});
