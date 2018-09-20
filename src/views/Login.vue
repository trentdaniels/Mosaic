<template>
    <div id="login" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Log In</h1>
            <h2 class="subtitle">Get back to your inspirations</h2>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="Email" v-model.trim="user.email"/>
                </div>
                <p class="help" v-show="user.email !== ''">Ex: creative@creative.com</p>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Password" v-model.trim="user.password"/>
                </div>
                <p class="help" v-show="user.password.length > 0">Be secretive..</p>
            </div>
            <div class="field">
                <div class="control">
                    <button @click="login" class="button is-primary">Connect</button>
                </div>
            </div>
            
            <p class="help">Don't have an account? <router-link to="/signup">Start Creating.</router-link></p>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

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
    ...mapActions(["getUser"]),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(
          userData => {
            console.log(userData);
            this.getUser(userData.user);
            this.$router.replace("home");
          },
          err => {
            alert(`Oops, ${err.message}`);
          }
        );
    }
  }
};
</script>

<style scoped>
</style>
