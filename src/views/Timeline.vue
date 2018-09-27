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
                        <div class="column is-3">
                            <h1 class="title is-1">Your Timeline</h1>
                            <h2 class="subtitle">See what people you follow are up to!</h2>
                            <p> Want to add to the timeline? <router-link class="has-text-weight-bold" to="/home">Discover and Interact</router-link> with more users or <router-link  class="has-text-weight-bold" to="creations/create">Create Something!</router-link>.</p>
                        </div>
                        <div class="column is-9">
                            <div class="columns is-multiline">
                                    <div class="column is-4">
                                        <keep-alive>
                                            <div class="card">
                                                <div class="card-image">
                                                    <figure class="image">
                                                        <img  alt="Creation Picture" />
                                                    </figure>
                                                </div>
                                                <div class="card-header">
                                                    <h1 class="card-header-title is-centered has-text-dark"></h1>
                                                </div>
                                                <div class="card-content">
                                                    <div class="field">
                                                        <p></p>
                                                    </div>
                                                    <div class="tags">
                                                        <span class="tag is-primary"></span>
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
import {mapActions} from 'vuex'
import Navigation from '@/components/Navigation.vue'
export default {
    name: 'Timeline',
    components: {
        Navigation
    },
    methods: {
        ...mapActions(['getPosts'])
    },
    beforeMount() {
        this.getPosts()
    }
    
}
</script>
