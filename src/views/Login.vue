<template>
    <div id="userStart" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Log In</h1>
            <h2 class="subtitle">Get back to your inspirations</h2>
            <div class="field" @keyup.enter="login">
                <div class="field">
                    <label class="label has-text-white">Email</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Email" v-model.trim="user.email"/>
                    </div>
                    <p class="help" v-show="user.email !== ''">Ex: creative@creative.com</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Password" v-model.trim="user.password"/>
                    </div>
                    <p class="help" v-show="user.password.length > 0">Be secretive..</p>
                </div>
                <div class="field">
                    <div class="control">
                        <button @click="login" class="button is-primary" :class="{'is-loading': loading}">Connect</button>
                    </div>
                </div>    
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
