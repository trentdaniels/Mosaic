<template>
  <div class="home">
    <navigation></navigation>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout" class="button is-danger">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from '@/components/Navigation.vue';
import firebase from 'firebase';

export default {
  name: "home",
  components: {
    HelloWorld,
    Navigation
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      }, (err) => {
        alert(`Oh no! ${err.message}`)
      })
    }
  }
};
</script>

<style lang="scss">
  .home {
    text-align: center;
  }
</style>
