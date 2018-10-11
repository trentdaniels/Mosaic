<template>

            <div   id="collections">
                <div class="container">
                    <navigation></navigation>
                    <div class="content">
                        <div class="columns is-multiline is-centered">
                            <div class="column is-4">
                                <h1 class="title is-1">{{ user.collections[selectedCollection].name }}</h1>
                            </div>
                            <div class="column is-8">
                                <b-tabs :animated="true" type="is-boxed" v-model="selectedCollection" @change="getProjects(selectedCollection)">
                                    <b-tab-item v-for="(collection,index) in user.collections" :key="index" :label="collection.name" ></b-tab-item>
                                </b-tabs>
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
                            <b-modal :active.sync="viewingDetails" :width="500">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image">
                                            <img :src="activeProject.covers.original" :alt="activeProject.name" />
                                        </figure>
                                    </div>
                                    <div class="card-header">
                                        <h1 class="card-header-title is-centered has-text-dark has-text-centered">{{ activeProject.name }}</h1>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            <h3 class="subtitle has-text-dark is-5 has-text-centered">{{ activeProject.owners[0].display_name }}</h3>
                                            <b-taglist>
                                                <b-tag v-for="field in activeProject.fields" :key="field" type="is-light">{{ field }}</b-tag>
                                            </b-taglist>
                                            <table class="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr v-for="(stat, key) in activeProject.stats" :key="key">
                                                        <td>{{ key }}</td>
                                                        <td class="has-text-primary">{{ stat }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Created</td>
                                                        <td>{{ dateCreated }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <a :href="activeProject.url" target="_blank" class="card-footer-item">View on Behance</a>
                                        <a class="card-footer-item" @click="cancelProject">Cancel</a>
                                    </div>
                                </div>
                            </b-modal>
                        </template>
                        <template v-else-if="viewingDetails && projectType === 'article'">
                            <b-modal :active.sync="viewingDetails" :width="500">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image">
                                            <img :src="activeProject.urlToImage" :alt="activeProject.description" />
                                        </figure>
                                    </div>
                                    <div class="card-header">
                                        <h1 class="card-header-title is-centered has-text-dark has-text-centered">{{ activeProject.title }}</h1>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            <h3 class="subtitle has-text-dark is-5 has-text-centered">{{ activeProject.author }}</h3>
                                            <p class="is-italic has-text-dark has-text-centered">{{ activeProject.description }}</p>
                                            <b-tag type="is-light">{{activeProject.source.name}}</b-tag>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <a :href="activeProject.url" target="_blank" class="card-footer-item">View on NewsApi</a>
                                        <a class="card-footer-item" @click="cancelProject">Cancel</a>
                                    </div>
                                </div>
                            </b-modal>
                        </template>
                        <template v-else-if="viewingDetails && projectType === 'photo'">
                            <b-modal :active.sync="viewingDetails" :width="600">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image">
                                            <img :src="activeProject.urls.regular" :alt="activeProject.description" />
                                        </figure>
                                    </div>
                                    <div class="card-header">
                                        <h1 class="card-header-title is-centered has-text-dark has-text-centered">{{ activeProject.description }}</h1>
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            <h3 class="subtitle has-text-dark is-5 has-text-centered">{{ activeProject.user.name }}</h3>
                                            <b-taglist>
                                                <b-tag v-for="(tag, index) in activeProject.photo_tags" :key="index" type="is-light">{{ tag.title }}</b-tag>
                                            </b-taglist>
                                            <table class="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Height</td>
                                                        <td>{{ activeProject.height }} px</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Width</td>
                                                        <td>{{ activeProject.width }} px</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Color</td>
                                                        <td :style="{'color': activeProject.color}">{{ activeProject.color }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Likes</td>
                                                        <td class="has-text-primary">{{ activeProject.likes }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <a :href="activeProject.links.html" target="_blank" class="card-footer-item">View on Unsplash</a>
                                        <a class="card-footer-item" @click="cancelProject">Cancel</a>
                                    </div>
                                </div>
                            </b-modal>
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
    dateCreated() {
      let date = new Date(this.activeProject.created_on);
      return `${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  },
  data() {
    return {
      selectedCollection: 0,
      collectionClicked: false,
      viewingDetails: false,
      activeProject: null,
      projectType: "",
      newNote: ""
    };
  },
  methods: {
    ...mapActions(["getProjectsByCollection", "addNewNote"]),
    async getProjects(collectionIndex) {
      let collectionName = this.user.collections[collectionIndex].name;
      await this.getProjectsByCollection(collectionName);
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
      if (this.newNote !== "" && this.currentCollection !== null) {
        this.addNewNote({
          text: this.newNote,
          collection: this.currentCollection
        });
        this.newNote = "";
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
  margin: 0;
}

textarea {
  white-space: pre;
}
</style>
