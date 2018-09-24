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
    import {mapGetters} from 'vuex'
    export default {
        name: 'Inspirations',
        computed: {
            ...mapGetters(['currentSearch', 'user']),
            noSearchResults() {
                return this.currentSearch.results.length === 0 && this.currentSearch.type !== null
            }
        },
        methods: {
            addToCollection(project, type) {
                this.$emit('addedProject', {type: type, data: project})
            }
        }
    }
</script>

<style scoped>
    
</style>