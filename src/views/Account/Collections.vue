<template>

            <div class="hero-head"  id="collections">
                <div class="container">
                    <navigation></navigation>
                    <div class="content">
                        <div class="columns is-multiline is-centered">
                            <div class="column is-4">
                                <h1 class="title is-1">{{ selectedCollection }}</h1>
                            </div>
                            <div class="column is-8">
                                <div class="tabs is-right is-boxed is-fullwidth">
                                    <ul>
                                        <li v-for="(collection,index) in user.collections" :key="index" :class="{'is-active': selectedCollection === collection.name}" @click="getProjects(collection.name)"><a>{{ collection.name }}</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="column is-3">
                                <h1 class="title is-3">Your Collections</h1>
                                <h2 class="subtitle is-5">View your collections here!</h2>
                                <div class="field">
                                    <aside class="menu" v-if="currentCollection">
                                        <p class="menu-label has-text-white" v-if="currentCollection.notes.length > 0">Your Notes</p>
                                        <ul class="menu-list">
                                            <li v-for="(note, index) in currentCollection.notes" :key="index">{{ note }}</li>
                                        </ul>
                                    </aside>
                                </div>
                                <div class="field" v-if="collectionClicked">
                                    <label class="label has-text-white">Make a Note</label>
                                    <div class="control">
                                        <textarea class="textarea" v-model="newNote"></textarea>
                                    </div>
                                    <p class="help">Make a note about your collection for the future!</p>
                                </div>
                                <div class="field" v-if="collectionClicked">
                                    <div class="control">
                                        <button class="button is-success" :class="{'is-loading': isLoading}" @click="addNote">Create Note</button>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-9">
                                    <template v-if="collectionClicked">
                                        <div class="field" v-if="currentCollection.projects !== null">
                                            <label class="label has-text-white" v-if="currentCollection.projects.length > 0">Projects</label>
                                            <div class="columns is-multiline">
                                                <div class="column is-4" v-for="(project,index) in currentCollection.projects" :key="index" v-if="currentCollection.projects.length > 0">
                                                    <div class="card">
                                                        <div class="card-image">
                                                            <figure class="image is-square">
                                                                <img :src="project.data.covers.original" :alt="project.data.name" />
                                                            </figure>
                                                        </div>
                                                        <div class="card-header">
                                                            <p class="card-header-title has-text-centered has-text-dark">{{ project.data.name }}</p>
                                                        </div>
                                                        <div class="card-content">
                                                            <div class="tags is-centered">
                                                                <span v-for="(field, index) in project.data.fields" :key="index" class="tag is-light">{{ field }}</span>
                                                            </div>
                                                            <div class="buttons is-centered">
                                                                <button class="button" @click="viewProject(project.data)">View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field" v-if="currentCollection.articles !== null">
                                            <label class="label has-text-white" v-if="currentCollection.articles.length > 0">Articles</label>
                                            <div class="columns">
                                                <div class="column is-4"  v-for="(article, index) in currentCollection.articles" :key="index" v-if="currentCollection.articles.length > 0">
                                                    <div class="card">
                                                        <div class="card-image">
                                                            <figure class="image is-square">
                                                                <img :src="article.data.urlToImage" :alt="article.data.description" />
                                                            </figure>
                                                        </div>
                                                        <div class="card-header">
                                                            <p class="card-header-title has-text-centered has-text-dark">{{ article.data.title }}</p>
                                                        </div>
                                                        <div class="card-content">
                                                            <div class="tags is-centered">
                                                                <span class="tag is-light">{{ article.data.author }}</span>
                                                            </div>
                                                            <div class="buttons is-centered">
                                                                <button class="button" @click="viewArticle(article.data)">View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field" v-if="currentCollection.photos !== null">
                                            <label class="label has-text-white" v-if="currentCollection.photos.length > 0">Photos</label>
                                            <div class="columns is-multiline">
                                                <div class="column is-4" v-for="(photo, index) in currentCollection.photos" :key="index" v-if="currentCollection.photos.length > 0">
                                                    <div class="card">
                                                        <div class="card-image">
                                                            <figure class="image is-square">
                                                                <img :src="photo.data.urls.regular" :alt="photo.data.description" />
                                                            </figure>
                                                        </div>
                                                        <div class="card-header">
                                                            <p class="card-header-title has-text-centered has-text-dark is-capitalized">{{ photo.data.description }}</p>
                                                        </div>
                                                        <div class="card-content">
                                                            <div class="tags is-centered">
                                                                <span v-for="(tag, index) in photo.data.photo_tags" :key="index" class="tag is-light">{{ tag.title }}</span>
                                                            </div>
                                                            <div class="buttons is-centered">
                                                                <button class="button" @click="viewPhoto(photo.data)">View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            
                        </div>
                        <template v-if="viewingDetails && projectType === 'project'">
                            <project :project="activeProject" @cancelled="cancelProject"></project>
                        </template>
                        <template v-else-if="viewingDetails && projectType === 'article'">
                            <app-article :article="activeProject" @cancelled="cancelProject"></app-article>
                        </template>
                        <template v-else-if="viewingDetails && projectType === 'photo'">
                            <photo :photo="activeProject" @cancelled="cancelProject"></photo>
                        </template>
                    </div>
                </div>
            </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/Navigation.vue";
import Project from "@/components/ModalPages/Project.vue";
import Article from "@/components/ModalPages/Article.vue";
import Photo from "@/components/ModalPages/Photo.vue";
export default {
  name: "Collections",
  components: {
    Navigation,
    Project,
    "app-article": Article,
    Photo
  },
  computed: {
    ...mapGetters(["user", "currentCollection", "isLoading"]),
    
  },
  data() {
    return {
      selectedCollection: "",
      collectionClicked: false,
      viewingDetails: false,
      activeProject: null,
      projectType: "",
      newNote: ''
    }
  },
  methods: {
    ...mapActions(["getProjectsByCollection", 'addNewNote']),
    async getProjects(collectionName) {
        await this.getProjectsByCollection(collectionName);
        this.selectedCollection = collectionName;
        this.collectionClicked = true;
    },
    viewProject(project) {
      this.projectType = "project";
      this.activeProject = project;
      this.viewingDetails = true;
    },
    viewArticle(article) {
      this.projectType = "article";
      this.activeProject = article;
      this.viewingDetails = true;
    },
    viewPhoto(photo) {
      this.projectType = "photo";
      this.activeProject = photo;
      this.viewingDetails = true;
    },
    cancelProject() {
      this.projectType = "";
      this.activeProject = null;
      this.viewingDetails = false;
    },
    addNote() {
        if(this.newNote !== '' && this.currentCollection !== null) {
            this.addNewNote({text: this.newNote, collection: this.currentCollection})
            this.newNote = ''
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
    box-sizing: border-box;
}

.content figure {
    margin: 0
}

textarea {
    white-space: pre;
}
</style>
