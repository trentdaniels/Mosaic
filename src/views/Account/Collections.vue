<template>
    <div id="collections">
        <section class="hero is-bold is-fullheight is-primary">
            <div class="hero-head">
                <div class="container">
                <navigation></navigation>
                </div>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-3">
                            <h1 class="title is-1">{{ selectedCollection }}</h1>
                            <h1 class="title">Your Collections</h1>
                            <h2 class="subtitle">View your collections here!</h2>
                        </div>
                        <div class="column is-9">
                            <div class="tabs">
                                <ul>
                                    <li v-for="(collection,index) in user.collections" :key="index" :class="{'is-active': selectedCollection === collection.name}" @click="getProjects(collection.name)"><a>{{ collection.name }}</a></li>
                                </ul>
                            </div>
                            <template v-if="collectionClicked">
                                <label class="label has-text-white" v-if="currentCollection.projects.length > 0">Projects</label>
                            <div class="field" v-if="currentCollection.projects !== null">
                                <div class="columns">
                                    <div class="column is-4" v-for="(project,index) in currentCollection.projects" :key="index" v-if="currentCollection.projects.length > 0">
                                        <div class="card">
                                            <div class="card-image">
                                                <figure class="image is-square">
                                                    <img :src="project.data.covers.original" :alt="project.data.name" />
                                                </figure>
                                            </div>
                                            <div class="card-header">
                                                <h1 class="card-header-title is-centered has-text-dark">{{ project.data.name }}</h1>
                                            </div>
                                            <div class="card-content">
                                                <div class="tags is-centered">
                                                    <span v-for="(field, index) in project.data.fields" :key="index" class="tag is-light">{{ field }}</span>
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
                                                <h1 class="card-header-title is-centered has-text-dark">{{ article.data.title }}</h1>
                                            </div>
                                            <div class="card-content">
                                                <div class="tags is-centered">
                                                    <span class="tag is-light">{{ article.data.author }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field" v-if="currentCollection.photos !== null">
                                <label class="label has-text-white" v-if="currentCollection.photos.length > 0">Photos</label>
                                <div class="columns">
                                    <div class="column is-4" v-for="(photo, index) in currentCollection.photos" :key="index" v-if="currentCollection.photos.length > 0">
                                        <div class="card">
                                            <div class="card-image">
                                                <figure class="image is-square">
                                                    <img :src="photo.data.urls.regular" :alt="photo.data.description" />
                                                </figure>
                                            </div>
                                            <div class="card-header">
                                                <h1 class="card-header-title is-centered has-text-dark">{{ photo.data.description }}</h1>
                                            </div>
                                            <div class="card-content">
                                                <div class="tags is-centered">
                                                    <span v-for="(tag, index) in photo.data.photo_tags" :key="index" class="tag is-light">{{ tag.title }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </template>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    export default {
        components: {
            Navigation
        },
        computed: {
            ...mapGetters(['user', 'currentCollection']),
        },
        data() {
            return {
                selectedCollection: '',
                collectionClicked: false
            }
        },
        methods: {
            ...mapActions(['getProjectsByCollection']),
            getProjects(collectionName) {
                this.selectedCollection = collectionName
                this.getProjectsByCollection(this.selectedCollection)
                this.collectionClicked = true
            }
            
        }
    }
</script>

<style scoped>

</style>