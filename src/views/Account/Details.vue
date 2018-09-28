<template>
    <div id="details">
    <section class="hero is-bold is-fullheight is-primary">
      <div class="hero-head">
        <div class="container">
        <template v-if="user.data.type === 'Creative'">
            <navigation></navigation>
        </template>
        <template v-else>
            <employer-navigation></employer-navigation>
        </template>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-centered is-multiline">
            <div class="column is-12">
                <h1 class="title is-1">Your Name is {{ user.data.name }}.</h1>
                <h3 class="subtitle is-3">(Great name by the way)</h3>
            </div>
          <div class="column is-6">
            <h1 class="title">Your Profile</h1>
            <h2 class="subtitle">Here's what we know about you:</h2>
            <p>Thanks again for using us!</p>
          </div>
            <div class="column is-6">
                
                <div class="field">
                    <label class="label has-text-white">Here's your bio:</label>
                    <p>{{ user.data.bio }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Contact Info:</label>
                    <p>{{ user.data.email }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Creations:</label>
                    <div class="tags is-multiline">
                        <span class="tag is-info" v-for="(creation, index) in user.creations" :key="index">{{ creation.name }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Collections:</label>
                    <div class="tags is-multiline">
                        <span class="tag is-light" v-for="(collection, index) in user.collections" :key="index">{{ collection.name }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">What would you like to do?</label>
                    <div class="buttons">
                        <router-link to="/account/edit" class="button is-light is-outlined" exact>Edit</router-link>
                        <router-link to="/account/delete" class="button is-light is-outlined" exact>Delete</router-link>
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
import EmployerNavigation from "@/components/EmployerNavigation.vue";
import Navigation from "@/components/Navigation.vue";

import { mapGetters } from "vuex";
export default {
  name: "Details",
  props: ["accountMethod"],
  components: {
    Navigation,
    EmployerNavigation
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
</style>
