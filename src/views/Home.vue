<template>
  <div class="home">
    <navigation></navigation>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";



export default {
  name: "home",
  components: {
    HelloWorld,
    Navigation
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.home {
  text-align: center;
}
</style>
