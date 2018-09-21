<template>
    <div id="inspirations" class="columns is-multiline is-centered">
        <template v-if="currentSearch.type === 'project' && !noSearchResults">
        <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4" >
            <div class="box">
                <figure class="image is-square">
                    <img :src="inspiration.covers.original" :alt="inspiration.name" />
                </figure>
                <h1 class="title is-4 has-text-dark">{{ inspiration.name }}</h1>
                <div class="tags is-centered">
                    <span v-for="(field, index) in inspiration.fields" :key="index" class="tag is-primary">{{ field }}</span>
                </div>
                <div class="buttons is-centered">
                        <button class="button is-success is-small is-rounded" v-if="isLoggedIn">Add to Collection</button>
                </div>
            </div>
        </div>
        </template>
        <template v-else-if="currentSearch.type === 'article' && !noSearchResults">
            <div v-for="(inspiration,index) in currentSearch.results" :key="index" class="column is-4">
                <div class="box">
                    <figure class="image">
                        <img :src="inspiration.urlToImage" :alt="inspiration.description" />
                    </figure>
                    <h1 class="title is-5 has-text-dark">{{ inspiration.title }}</h1>
                    <p class="subtitle is-6">By: {{inspiration.author}}</p>
                    <p>{{ inspiration.content }}</p>
                    <div class="buttons is-centered">
                        <button class="button is-success is-small is-rounded" v-if="isLoggedIn">Add to Collection</button>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="currentSearch.type === 'photo' && !noSearchResults">
            <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4">
                <div class="box">
                    <figure class="image is-square">
                        <img :src="inspiration.urls.thumb" :alt="inspiration.description" />
                    </figure>
                    <h1 class="title is-4 has-text-dark">{{ inspiration.description }}</h1>
                    <div class="tags">
                        <span v-for="(tag, index) in inspiration.photo_tags" :key="index" class="tag is-light">{{ tag.title }}</span>
                    </div>
                    <div class="buttons is-centered">
                        <button class="button is-success is-small is-rounded" v-if="isLoggedIn">Add to Collection</button>
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
            ...mapGetters(['currentSearch', 'isLoggedIn']),
            noSearchResults() {
                return this.currentSearch.results.length === 0
            }
        }
    }
</script>

<style scoped>
    
</style>