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
                    <div class="columns is-centered is-multiline">
                        <div class="column is-12">
                            <h1 class="title is-1">{{ selectedCollection }}</h1>
                        </div>
                        <div class="column is-3">
                            <h1 class="title">Your Collections</h1>
                            <h2 class="subtitle">View your collections here!</h2>
                            <div class="menu">
                                <p class="menu-label has-text-white" v-if="user.collections.length > 0">Choose a Collection</p>
                                <ul class="menu-list">
                                    <li v-for="(collection,index) in user.collections" :key="index" :class="{'is-active': selectedCollection === collection.name}" @click="getProjects(collection.name)"><a>{{ collection.name }}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="column is-9">
                            <template v-if="collectionClicked">
                                <label class="label has-text-white" v-if="currentCollection.projects.length > 0">Projects</label>
                            <div class="field" v-if="currentCollection.projects !== null">
                                <div class="columns is-multiline">
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
                                                <h1 class="card-header-title has-text-centered has-text-dark">{{ article.data.title }}</h1>
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
                                            <div class="card-header is-centered">
                                                <h1 class="card-header-title has-text-centered has-text-dark is-capitalized">{{ photo.data.description }}</h1>
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
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    import Project from '@/components/ModalPages/Project.vue'
    import Article from '@/components/ModalPages/Article.vue'
    import Photo from '@/components/ModalPages/Photo.vue'
    export default {
        name: 'Collections',
        components: {
            Navigation,
            Project,
            'app-article': Article,
            Photo
        },
        computed: {
            ...mapGetters(['user', 'currentCollection']),
        },
        data() {
            return {
                selectedCollection: '',
                collectionClicked: false,
                viewingDetails: false,
                activeProject: null,
                projectType: ''
            }
        },
        methods: {
            ...mapActions(['getProjectsByCollection']),
            getProjects(collectionName) {
                this.selectedCollection = collectionName
                this.getProjectsByCollection(this.selectedCollection)
                this.collectionClicked = true
            },
            viewProject(project) {
                this.projectType = 'project'
                this.activeProject = project
                this.viewingDetails = true
            },
            viewArticle(article) {
                this.projectType = 'article'
                this.activeProject = article
                this.viewingDetails = true
            },
            viewPhoto(photo) {
                this.projectType = 'photo'
                this.activeProject = photo
                this.viewingDetails = true
            },
            cancelProject() {
                this.projectType = ''
                this.activeProject = null
                this.viewingDetails = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-list a {
        color: white;
        &:hover {
            background-color: #00d1b2;
        }
    }
</style>