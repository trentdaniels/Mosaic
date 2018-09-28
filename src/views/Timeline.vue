<template>
    <div id="timeline">
        <section class="hero is-bold is-fullheight is-primary">
            <div class="hero-head">
                <div class="container">
                <navigation></navigation>
                </div>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-5">
                            <h1 class="title is-1">Your Timeline</h1>
                            <h2 class="subtitle">See what people you follow are up to!</h2>
                            <p> Want to add to the timeline?<br><router-link class="has-text-weight-bold" to="/home">Discover and Interact</router-link> with more users<br> or <router-link  class="has-text-weight-bold" to="/account/creations/create">Create Something!</router-link>.</p>
                        </div>
                        <div class="column is-7">
                            <div class="card is-horizontal columns" v-for="(post,index) in posts" :key="index">
                                <div class="card-image column is-three-fifths">
                                    <figure class="image is-4by3">
                                        <img  :src="post.image" alt="Post Image" />
                                        
                                    </figure>
                                </div>
                                <div class="card-content column is-two-fifths">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-64x64">
                                                <img  :src="post.image" alt="Post Image" />
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4 has-text-dark">{{ post.name }}</p>
                                            <p class="subtitle is-6 has-text-dark">@{{ post.userName }}</p>
                                        </div>
                                        <div class="media-right">
                                            {{ getTime(post.created) }}
                                        </div>
                                    </div>
                                    <div class="content">
                                        {{ post.description }}
                                        <br><br>
                                        <div class="tags">
                                            <span class="tag is-small" v-for="(category,index) in post.categories" :key="index">{{ category }}</span>
                                        </div>
                                        <div class="buttons">
                                            <template v-if="post.likedUsers.includes(user.id)">
                                                <button class="button is-info" disabled>Liked</button>
                                            </template>
                                            <template v-else>
                                                <button class="button is-info" @click="incrementLike(post, index)">Like</button>
                                            </template>
                                            <router-link :to="{ name: 'userProfile', params: { id: post.userId }}" class="button is-success" :class="{'is-loading': loading}">View Creative</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                         
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Timeline",
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(["posts", "isLoading", "likedPostUsers", "user"]),
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions(["getPosts", "likePost"]),
    getTime(time) {
      let date = new Date(time);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${month}/${year} at ${hours}:${minutes}`;
    },
    incrementLike(post, index) {
      this.likePost({ data: post, index: index });
    }
  },
  beforeMount() {
    this.getPosts();
  }
};
</script>

<style lang="scss" scoped>

.card {
    .media:not(:last-child) {
        margin-bottom: 1rem;
    }
    &.card--reverse-order { 
        flex-direction: row-reverse; 
    }
    &.is-horizontal {
        display: flex;
        flex-basis: 50ex;
        flex-grow: 0;
        flex-shrink: 1;
        .card-image {
            flex: 4;
            flex-shrink: 1;
            &.column {
                padding: 0;
            }   
            .image {
                display: block;
                position: relative;
                overflow: hidden;
                height: 100%;
                width: 100%;
                img {
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }
        }
        .card-content {
            flex: 3;
        }
    }
    &.columns {
        margin-top: 0;
        &:not(:last-child) {
            margin-bottom: 1.25rem;
        }
    }
    
    
}

</style>
