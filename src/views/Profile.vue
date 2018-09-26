<template>
    <div id="details">
    <section class="hero is-bold is-fullheight is-primary">
      <div class="hero-head">
        <div class="container">
         <navigation></navigation>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-centered">
          <div class="column is-6">
            <h1 class="title">Profile View</h1>
            <h2 class="subtitle">Get to know this creative!</h2>
          </div>
            <div class="column is-6">
                <h1 class="title is-1">Meet {{ profile.data.name }}.</h1>
                <h3 class="subtitle is-3">(Pretty good name if you ask me)</h3>
                <div class="field">
                    <label class="label has-text-white">Bio:</label>
                    <p>{{ profile.data.bio }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Contact Info:</label>
                    <p>{{ profile.data.email }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Creations:</label>
                    <p v-for="(creation, index) in profile.creations" :key="index">{{ creation.name }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Collections:</label>
                    <p v-for="(collection, index) in profile.collections" :key="index">{{ collection.name }}</p>
                </div>
                <div class="buttons">
                    <router-link to="/account/edit" class="button is-light" exact>Edit</router-link>
                    <router-link to="/account/delete" class="button is-dark" exact>Delete</router-link>
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Profile',
        components: {
            Navigation,
        },
        props: ['id'],
        computed: {
            ...mapGetters(['user','profile'])
        },
        methods: {
            ...mapActions(['fetchUser'])
        },
        beforeMount() {
            this.fetchUser(this.id)
        }
    }
</script>

<style scoped>

</style>