<template>
    <div id="edit">
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
        <div class="columns is-centered">
            <div class="column is-6">
                <h1 class="title">Change is Good.</h1>
                <h2 class="subtitle">We admire your need for change! Let's get started.</h2>
                <p>Fill out the form to save your changes</p>
            </div>
            <div class="column is-6">
                <h1 class="title is-1">Edit Your Account.</h1>
                <h3 class="subtitle is-3">Let's change it up a bit.</h3>
                <div class="field">
                    <label class="label has-text-white">Name:</label>
                    <div class="control">
                        <input class="input" type="text" v-model="editedUser.name" :placeholder="user.data.name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Email:</label>
                    <div class="control">
                        <input class="input" type="email" v-model="editedUser.email" :placeholder="user.data.email"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Bio:</label>
                    <div class="control">
                        <textarea class="textarea" v-model="editedUser.bio" :placeholder="user.data.bio"></textarea>
                    </div>
                </div>
                <div class="buttons">
                    <button class="button is-success" @click="updateInfo" :class="{'is-loading': loading}">Save</button>
                    <router-link to="/account" class="button is-light">Cancel</router-link>
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/Navigation.vue";
import EmployerNavigation from "@/components/EmployerNavigation.vue";
export default {
  name: "Edit",
  components: { Navigation, EmployerNavigation },
  data() {
    return {
      editedUser: {
        name: "",
        email: "",
        bio: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user", "isLoading"]),
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions(["editUser"]),
    updateInfo() {
      this.editUser(this.editedUser);
    }
  }
};
</script>

<style scoped>
</style>
