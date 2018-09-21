import "bulma";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { config } from "./credentials/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



firebase.initializeApp(config);

let app;
Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
