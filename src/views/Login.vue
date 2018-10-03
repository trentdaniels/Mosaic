<template>
    <div id="userStart" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Log In</h1>
            <h2 class="subtitle">Get back to your inspirations</h2>
            <div class="field" @keyup.enter="login">
                <b-field label="Email" message="Ex: creative@creative.com" custom-class="has-text-white">
                    <b-input v-model.trim="user.email" icon="email" type="email" placeholder="Email"></b-input>
                </b-field>
                <b-field label="Password" message="Be secretive!" custom-class="has-text-white">
                    <b-input type="password" v-model.trim="user.password" icon="security" placeholder="Password"></b-input>
                </b-field>
                <b-field>                        
                    <button @click="login" class="button is-primary" :class="{'is-loading': loading}">Connect</button>
                </b-field>
                <p class="help">Don't have an account? <router-link to="/signup" class="has-text-weight=bold">Start Creating.</router-link></p>
                <p class="help"><router-link to="/home" class="has-text-weight=bold">Browse Quickly</router-link> (We prefer you sign in first).</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      logInUser: "logIn"
    }),
    login() {
      this.logInUser(this.user);
    }
  },
  computed: {
    ...mapGetters(["isLoading"]),
    loading() {
      return this.isLoading;
    }
  }
};
</script>

<style scoped>
</style>
