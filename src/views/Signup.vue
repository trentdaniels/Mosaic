<template>
    <div id="login" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Sign Up</h1>
            <h2 class="subtitle">Get Creating.</h2>
            <div class="field" @keyup.enter="signUp">
                <div class="field">
                    <label class="label">What is your first name?</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model.lazy.trim="user.name"/>
                    </div>
                    <p v-if="user.name.length > 0" class="help">Nice to meet you, {{ user.name }}!</p>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Email" v-model.trim="user.email"/>
                    </div>
                    <p class="help">Ex: creative@creative.com</p>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Password" v-model.trim="user.password"/>
                    </div>
                    <p class="help">Create your password</p>
                </div>
                
                <div class="field">
                    <label class="label">Tell us about yourself!</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Need a hint? What's your favorite animal?" v-model="user.bio"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button @click="signUp" class="button is-primary">Get Inspired</button>
                    </div>
                </div>
                
                <p class="help">Already have an account? <router-link to="/login">Login.</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import firebase, { auth } from "firebase";
import {mapActions} from 'vuex'
export default {
  name: "signup",
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: '',
        bio: ''
      }
    };
  },
  methods: {
    ...mapActions({
        createUser: 'signUp'
    }),
    signUp() {
        this.createUser(this.user)
    }
      
  }
};
</script>

<style scoped>
</style>
