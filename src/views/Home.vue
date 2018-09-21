<template>
  <div class="home">
    <section class="hero is-bold is-fullheight is-light">
      <div class="hero-head">
        <div class="container">
         <navigation></navigation>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <img alt="Vue logo" src="../assets/logo.png">
            <h1 class="title">Welcome {{ name }}!</h1>
            <h2 class="subtitle">Let's get inspired.</h2>
          </div>
          <div class="column is-10">
            <main-search @searched="getProjects"></main-search>
          </div>
        </div>
        <inspirations></inspirations>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MainSearch from "@/components/MainSearch.vue";
import Navigation from "@/components/Navigation.vue";
import { mapGetters, mapActions } from 'vuex'
import Inspirations from '@/components/Inspirations.vue'

export default {
  name: "home",
  components: {
    MainSearch,
    Navigation,
    Inspirations
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    ...mapActions(['searchProjects']),
    getProjects(query) {
      this.searchProjects(query)
    }
  }
};
</script>

<style lang="scss">
.home {
  text-align: center;
}
</style>
