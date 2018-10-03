import "bulma/bulma.sass";
import Vue from "vue";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { config } from "./credentials/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp(config);
Vue.use(Buefy)
let app;
Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("getUser", user.uid);
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
