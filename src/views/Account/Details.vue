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
            <h1 class="title">Hey, you're back!</h1>
            <h2 class="subtitle">Here's what we know about you:</h2>
            <p>Thanks again for using us!</p>
          </div>
            <div class="column is-6">
                <template v-if="!isEditing && !isDeleting">
                    <h1 class="title is-1">Your Name is {{ userDetails.name }}.</h1>
                    <h3 class="subtitle is-3">(Great name by the way)</h3>
                    <div class="field">
                        <label class="label has-text-white">Here's your bio:</label>
                        <p>{{ userDetails.bio }}</p>
                    </div>
                    <div class="field">
                        <label class="label has-text-white">Contact Info:</label>
                        <p>{{ userDetails.email }}</p>
                    </div>
                    <div class="buttons">
                        <router-link @click.native="isEditing = true" to="/account/edit" class="button is-light" exact>Edit</router-link>
                        <router-link to="/account/delete" class="button is-dark" exact>Delete</router-link>
                    </div>
                </template>
                <template v-else-if="isEditing && !isDeleting">
                    <router-view @cancelled="reset"></router-view>
                </template>
                <template v-else-if="!isEditing && isDeleting">
                    <router-view></router-view>
                </template>
            </div>
            
            
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

import { mapGetters } from 'vuex';
    export default {
        name: 'Details',
        components: {
            Navigation,
        },
        computed: {
            ...mapGetters(['userDetails'])
        },
        data() {
            return {
                isEditing: false,
                isDeleting: false
            }
        },
        methods: {
            reset() {
                this.isEditing = false;
                this.isDeleting = false;
            }
        }
        
    }
</script>

<style scoped>

</style>