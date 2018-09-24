<template>
  <div class="home">
    <section class="hero is-bold is-fullheight is-primary">
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
            <div v-if="user">
              <h1 class="title">Welcome {{ user.data.name }}!</h1>
              <h2 class="subtitle">Let's get inspired.</h2>
            </div>
            <div v-else>
              <h1 class="title">Welcome</h1>
              <h2 class="subtitle">Please log in for a greater experience</h2>
            </div>
          </div>
          <div class="column is-10">
            <main-search @searched="getProjects"></main-search>
          </div>
        </div>
        <inspirations @addedProject="addToCollection"></inspirations>
        <template v-if="addingProject">
          <collection-modal :project=projectToAdd @cancelled="cancel" @saved="saveProject" @addedNewCollection="createCollection"></collection-modal>
        </template>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MainSearch from "@/components/MainSearch.vue";
import Navigation from "@/components/Navigation.vue";
import CollectionModal from '@/components/CollectionModal.vue'
import { mapGetters, mapActions } from 'vuex'
import Inspirations from '@/components/Inspirations.vue'

export default {
  name: "home",
  components: {
    MainSearch,
    Navigation,
    Inspirations,
    CollectionModal
  },
  data() {
    return {
      addingProject: false,
      projectToAdd: null
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['searchProjects', 'addProject', 'createNewCollection']),
    getProjects(query) {
      this.searchProjects(query)
    },
    addToCollection(project) {
      this.projectToAdd = project
      this.addingProject = true
    },
    saveProject(collectionName) {
      this.addProject(this.projectToAdd, collectionName)
    },
    cancel() {
      this.addingProject = false
    },
    createCollection(collectionName) {
      this.createNewCollection({
        name: collectionName, 
        data: this.projectToAdd
      })
      this.addingProject = false
    }
  }
};
</script>

<style lang="scss">
.home {
  text-align: center;
}

</style>
