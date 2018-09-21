<template>
    <div id="inspirations" class="columns is-multiline is-centered">
        <template v-if="currentSearch.type === 'project'">
        <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4" >
            <div class="box">
                <figure class="image is-square">
                    <img :src="inspiration.covers.original" :alt="inspiration.name" />
                </figure>
                <h1 class="title is-4">{{ inspiration.name }}</h1>
                <div class="tags">
                    <span v-for="(field, index) in inspiration.fields" :key="index" class="tag is-primary">{{ field }}</span>
                </div>
            </div>
        </div>
        </template>
        <template v-else-if="currentSearch.type === 'article'">
            <div v-for="(inspiration,index) in currentSearch.results" :key="index" class="column is-4">
                <div class="box">
                    <figure class="image">
                        <img :src="inspiration.urlToImage" :alt="inspiration.description" />
                    </figure>
                    <h1 class="title is-5">{{ inspiration.title }}</h1>
                    <p class="subtitle is-6">By: {{inspiration.author}}</p>
                    <p>{{ inspiration.content }}</p>
                </div>
            </div>
        </template>
        <template v-else-if="currentSearch.type === 'photo'">
            <div v-for="inspiration in currentSearch.results" :key="inspiration.id" class="column is-4">
                <div class="box">
                    <figure class="image is-square">
                        <img :src="inspiration.urls.thumb" :alt="inspiration.description" />
                    </figure>
                    <h1 class="title is-4">{{ inspiration.description }}</h1>
                    <div class="tags">
                        <span v-for="(tag, index) in inspiration.photo_tags" :key="index" class="tag is-light">{{ tag.title }}</span>
                    </div>
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
            ...mapGetters(['currentSearch'])
        }
    }
</script>

<style scoped>

</style>