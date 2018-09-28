<template>
    <div id="inspirations" class="columns is-multiline is-centered">
        <template v-if="currentSearch.type === 'project' && !noSearchResults">
        <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4" >
            <div class="card">
                <div class="card-image">
                    <figure class="image is-square">
                        <img :src="inspiration.covers.original" :alt="inspiration.name" />
                    </figure>
                </div>
                <div class="card-header">
                    <h1 class="card-header-title is-centered has-text-dark">{{ inspiration.name }}</h1>
                </div>
                <div class="card-content">
                    <div class="tags is-centered">
                        <span v-for="(field, index) in inspiration.fields" :key="index" class="tag is-light">{{ field }}</span>
                    </div>
                    <div class="buttons is-centered">
                        <button class="button is-default" v-if="user" @click="addToCollection(inspiration, currentSearch.type)">Add to Collection</button>
                    </div>
                </div>
            </div>
        </div>
        </template>
        <template v-else-if="currentSearch.type === 'creation' && !noSearchResults">
            <div v-for="(creation, index) in currentSearch.results" :key="index" class="column is-4">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="creation.image" :alt="creation.description" />
                        </figure>
                    </div>
                    <div class="card-header">
                        <p class="card-header-title has-text-dark is-centered">{{ creation.name }}</p>
                    </div>
                    <div class="card-content">
                        <p class="subtitle is-6 has-text-dark has-text-weight-bold">{{ creation.userName}}</p>
                        <div class="content">
                            <p>{{ creation.description }}</p>
                            <p>Created: {{ getDate(creation.created)}}</p>
                        </div>
                        <div class="content">
                            <div class="tags is-centered">
                                <span class="tag is-light" v-for="category in creation.categories" :key="category">{{ category }}</span>
                            </div>
                        </div>
                        <div class="buttons is-centered">
                            <button v-if="user.data.type === 'Creative'" @click="incrementLike(creation, index)" class="button is-info is-rounded" :disabled="liked(creation.name)">{{creation.likes}}</button>
                            <router-link :to="{ name: 'userProfile', params: { id: creation.userId }}" class="button is-success" :class="{'is-loading': loading}">View Creative</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="currentSearch.type === 'article' && !noSearchResults">
            <div v-for="(inspiration,index) in currentSearch.results" :key="index" class="column is-4">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="inspiration.urlToImage" :alt="inspiration.description" />
                        </figure>
                    </div>
                    <div class="card-header">
                        <p class="card-header-title has-text-dark is-centered">{{ inspiration.title }}</p>
                    </div>
                    <div class="card-content">
                        <p class="subtitle is-6 has-text-dark">By: {{inspiration.author}}</p>
                        <p>{{ inspiration.description }}</p>
                        <div class="buttons is-centered">
                            <button class="button is-default" v-if="user" @click="addToCollection(inspiration, currentSearch.type)">Add to Collection</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="currentSearch.type === 'photo' && !noSearchResults">
            <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-square">
                            <img :src="inspiration.urls.regular" :alt="inspiration.description" />
                        </figure>
                    </div>
                    <div class="card-header">
                        <h1 class="card-header-title is-centered">{{ inspiration.description }}</h1>
                    </div>
                    <div class="card-content">
                    <div class="tags is-centered">
                        <span v-for="(tag, index) in inspiration.photo_tags" :key="index" class="tag is-light">{{ tag.title }}</span>
                    </div>
                    <div class="buttons is-centered">
                        <button class="button is-default" v-if="user" @click="addToCollection(inspiration, currentSearch.type)">Add to Collection</button>
                    </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="noSearchResults">
            <div class="column is-6">
                <div class="box">
                    <h1 class="title is-1 has-text-dark">Oh No!</h1>
                    <p>Your search didn't return any results. Please try again!</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Inspirations",
  computed: {
    ...mapGetters(["currentSearch", "user", "alreadyLiked", "isLoading"]),
    noSearchResults() {
      return (
        this.currentSearch.results.length === 0 &&
        this.currentSearch.type !== null
      );
    },
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions(["like", "fetchUser"]),
    addToCollection(project, type) {
      this.$emit("addedProject", { type: type, data: project });
    },
    getProfile(id) {
      this.fetchUser(id);
    },
    incrementLike(creation, index) {
      this.like({ creation: creation, index: index });
    },
    liked(name) {
      return this.alreadyLiked.includes(name);
    },
    getDate(number) {
      let date = new Date();
      return `0${date.getMonth(number) + 1}/${date.getFullYear(number)}`;
    }
  }
};
</script>

<style scoped>
</style>
