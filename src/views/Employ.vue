<template>
  <div class="employ">
    <section class="hero is-bold is-fullheight is-primary">
      <div class="hero-head">
        <div class="container">
            <employer-navigaton></employer-navigaton>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <img alt="Vue logo" src="../assets/logo.png">
            <div v-if="user">
              <h1 class="title">Welcome {{ user.data.name }}!</h1>
              <h2 class="subtitle">Find Creatives to employ</h2>
            </div>
            <div v-else>
              <h1 class="title">Welcome</h1>
              <h2 class="subtitle">Please log in for a greater experience</h2>
            </div>
          </div>
          <div class="column is-10">
              <creatives-search @searched="getProjects"></creatives-search>
          </div>
        </div>
        <inspirations @addedProject="addToCollection"></inspirations>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import Inspirations from '@/components/Inspirations.vue'
import EmployerNavigaton from '@/components/EmployerNavigation.vue'
import CreativesSearch from '@/components/CreativesSearch.vue'


export default {
  name: "home",
  components: {
    Inspirations,
    CreativesSearch,
    EmployerNavigaton
  },
  data() {
    return {
      addingProject: false,
      projectToAdd: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    isEmployee() {
      return this.user.data.type === 'Employee'
    }
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
      this.addProject({
        project: this.projectToAdd, 
        collection: collectionName
      })
      this.addingProject = false
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
.employ {
  text-align: center;
}

</style>
