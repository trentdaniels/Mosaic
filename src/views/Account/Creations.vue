<template>
    <div id="creations">
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
                            <h1 class="title is-1">Your Creations</h1>
                            <h2 class="subtitle">View your creations here!</h2>
                            <p> Feeling inspired? Well you can make a new creation by clicking  <router-link  class="has-text-weight-bold" to="creations/create">Here</router-link>.</p>
                        </div>
                        <div class="column is-9">
                            <div class="columns is-multiline">
                                    <div class="column is-4" v-for="(creation,index) in user.creations" :key="index">
                                        <keep-alive>
                                            <div class="card">
                                                <div class="card-image">
                                                    <figure class="image">
                                                        <img :src="creation.image" alt="Creation Picture" />
                                                    </figure>
                                                </div>
                                                <div class="card-header">
                                                    <h1 class="card-header-title is-centered has-text-dark">{{ creation.name }}</h1>
                                                </div>
                                                <div class="card-content">
                                                    <div class="field">
                                                        <p>{{ creation.description }}</p>
                                                    </div>
                                                    <div class="tags">
                                                        <span class="tag is-primary">{{ creation.category }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </keep-alive>
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
    import { mapGetters } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    export default {
        name: 'Creations',
        components: {
            Navigation
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>

</style>