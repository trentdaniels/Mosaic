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
            <template v-if="!isEditing && !isDeleting">
                <div class="column is-6">
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
                        <button @click ="isEditing = true" class="button is-light">Edit</button>
                        <button @click="isDeleting = true" class="button is-dark">Delete</button>
                    </div>
                </div>
            </template>
            <template v-else-if="isEditing">

            </template>
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Edit from './Edit.vue'
import Delete from './Delete.vue'

import { mapGetters } from 'vuex';
    export default {
        name: 'Details',
        components: {
            Navigation
        },
        computed: {
            ...mapGetters(['userDetails'])
        },
        data() {
            return {
                isEditing: false,
                isDeleting: false
            }
        }
    }
</script>

<style scoped>

</style>