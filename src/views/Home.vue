<template>
  <div class="home">
      <div class="hero-head">
        <div class="container">
            <navigation></navigation>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <div class="content">
            <h1 class="title is-1" id="logo">MOSAIC</h1>
            <div v-if="user">
              <h1 class="title is-3">Welcome {{ user.data.name }}!</h1>
              <h2 class="subtitle is-5">Let's get inspired.</h2>
            </div>
            <div v-else>
              <h1 class="title">Welcome</h1>
              <h2 class="subtitle">Please log in for a greater experience</h2>
            </div>
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
    
  </div>
</template>

<script>
// @ is an alias to /src
import MainSearch from "@/components/MainSearch.vue";
import Navigation from "@/components/Navigation.vue";
import CollectionModal from "@/components/CollectionModal.vue";
import { mapGetters, mapActions } from "vuex";
import Inspirations from "@/components/Inspirations.vue";

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
      projectToAdd: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isEmployee() {
      return this.user.data.type === "Employee";
    }
  },
  methods: {
    ...mapActions(["searchProjects", "addProject", "createNewCollection"]),
    getProjects(query) {
      this.searchProjects(query);
    },
    addToCollection(project) {
      this.projectToAdd = project;
      this.addingProject = true;
    },
    saveProject(collectionName) {
      this.addProject({
        project: this.projectToAdd,
        collection: collectionName
      });
      this.addingProject = false;
    },
    cancel() {
      this.addingProject = false;
    },
    createCollection(collectionName) {
      this.createNewCollection({
        name: collectionName,
        data: this.projectToAdd
      });
      this.addingProject = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  #logo {
    font-size: 6rem;
    letter-spacing: 1rem;
  }
  
}
</style>
