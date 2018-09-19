import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import { config } from "./credentials/firebase"
import "bulma";

firebase.initializeApp(config);
let app;
Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})

