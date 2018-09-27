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
                            <div class="column is-12" v-for="(post,index) in posts" :key="index">
                                    <div class="media">
                                        <div class="media-left">
                                            <div class="content">
                                                <figure class="image is-128x128">
                                                    <img  :src="post.image" alt="Post Image" />
                                                    <div class="tags has-addons">
                                                    <span class="tag">Likes</span>
                                                    <span class="tag is-dark">{{ post.likes }}</span>
                                                </div>
                                                </figure>
                                                
                                            </div>
                                        </div>
                                        <div class="media-content">
                                            <div class="content">
                                                <p><span class="has-text-weight-bold is-size-4">{{ post.userName }} </span>created at {{ getTime(post.created) }}<br>
                                                    <span class="has-text-weight-bold is-size-6">{{ post.name }}</span><br>
                                                    <span class="is-italic is-size-6">{{ post.description }}</span><br>
                                                </p>
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
                                   <hr class="hr"/> 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Navigation from '@/components/Navigation.vue'
export default {
    name: 'Timeline',
    components: {
        Navigation
    },
    computed: {
        ...mapGetters(['posts', 'isLoading', 'likedPostUsers','user']),
        loading() {
            return this.isLoading
        },
    },
    methods: {
        ...mapActions(['getPosts', 'likePost']),
        getTime(time) {
            let date = new Date(time)
            let hours = date.getHours()
            let minutes = date.getMinutes()
            return `${hours}:${minutes}`
        },
        incrementLike(post, index) {
            this.likePost({data: post, index: index})
        },
    },
    beforeMount() {
        this.getPosts()
    }
    
}
</script>

<style lang="scss" scoped>
.hr {
    border: 0;
    height: 0;
    border-top: 3px solid rgba(255, 255, 255, 0.1);
    border-bottom: 3px solid rgba(255, 255, 255, 0.1);
    width: 15%;
}
</style>