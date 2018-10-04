<template>
    <div id="create">
   
      <div class="hero-head">
        <div class="container">
         <navigation></navigation>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-centered">
            <div class="column is-6">
                <h1 class="title is-1">Creation Details</h1>
                <h2 class="subtitle">Let's change it up a bit.</h2>
                <p>You can also go <router-link class="has-text-weight-bold" to="../creations">Back To Your Creations</router-link></p>
            </div>
            <div class="column is-6">
                <b-field label="Creation Name" message="What is your creation's name?" custom-class="has-text-white">
                    <b-input v-model.lazy="creation.name" type="text" placeholder="Creation Name"></b-input>
                </b-field>
                <b-field message="Hold down shift or command when selecting to choose multiple" label="Select your creation's categories" custom-class="has-text-white">
                    <b-select multiple :native-size="categories.length" v-model.lazy="creation.categories" expanded>
                        <option v-for="(category, index) of categories" :key="index" :value="category">{{ category }}</option>
                    </b-select>
                </b-field>
                <b-field label="Description" custom-class="has-text-white" message="Talk about what you used, how you made it, etc.">
                    <b-input v-model.lazy="creation.description" type="textarea" placeholder="Talk about your creation!"></b-input>
                </b-field>
                <b-field class="file" custom-class="has-text-white">
                    <b-upload v-model="creation.file" accept="image/*">
                        <a class="button is-light">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload Image</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="creation.file && creation.file.length">
                        {{ creation.file[0].name }}
                    </span>
                </b-field>
                
                <div class="field">
                    <div class="control">
                        <button @click="submitProject" class="button is-dark" :class="{'is-loading': loading}">Create Project</button>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CreateProject",
  components: {
    Navigation
  },
  data() {
    return {
      creation: {
        name: "",
        description: "",
        categories: [],
        image: null,
        file: null
      },
      fileName: "Your Project Image"
    };
  },
  computed: {
    ...mapGetters(["categories", "isLoading"]),
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions(["createProject"]),
    submitProject() {
      this.createProject({
          name: this.creation.name,
          description: this.creation.description,
          categories: this.creation.categories,
          image: this.creation.image,
          file: this.creation.file[0]
      });
    }
  }
};
</script>

<style scoped>
</style>
