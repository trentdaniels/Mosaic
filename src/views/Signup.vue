<template>
    <div id="login" class="section">
        <div class="columns">
        <div class="container column is-6">
            <h1 class="title">Sign Up</h1>
            <h2 class="subtitle">Get Creating.</h2>
            <div class="field" @keyup.enter="signUp">
                <b-field label="What is your first name?" custom-class="has-text-white">
                    <b-input type="text" v-model.trim="user.name" icon="face" placeholder="Name"></b-input>
                </b-field>
                <b-field label="Email" message="Ex: creative@creative.com" custom-class="has-text-white">
                    <b-input v-model.trim="user.email" icon="email" type="email" placeholder="Email"></b-input>
                </b-field>
                <b-field label="Password" message="Be secretive!" custom-class="has-text-white">
                    <b-input type="password" v-model.trim="user.password" icon="security" placeholder="Password"></b-input>
                </b-field>
                <b-field label="Confirm Password" message="Just to make sure.." custom-class="has-text-white">
                    <b-input type="password" v-model.trim="confirmedPassword" icon="security" placeholder="Re-enter your password"></b-input>
                </b-field>
                <b-field label="Tell us about yourself!" custom-class="has-text-white">
                    <b-input v-model.trim="user.bio" icon="description" type="textarea" placeholder="Need a hint? What's your favorite animal?"></b-input>
                </b-field>
                <b-field label="Why are you using Mosaic?" custom-class="has-text-white" message="We refine your experience based on this question!">
                    <b-select placeholder="Purpose" icon="earth" v-model="user.type">
                        <option value="Creative">I want to share my creations everywhere!</option>
                        <option value="Employer">I am an employer looking to employ creatives!</option>
                    </b-select>
                </b-field>
                <b-field>
                    <button @click="signUp" class="button is-success" :class="{'is-loading': loading}">Start Creating</button>
                </b-field>
                
                <p class="help">Already have an account? <router-link class="has-text-weight=bold" to="/login">Login.</router-link></p>
                <p class="help"><router-link to="/home" class="has-text-weight=bold">Browse Quickly</router-link> (We prefer you sign in first).</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "signup",
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        bio: "",
        type: "Creative"
      },
      confirmedPassword: ''
    };
  },
  methods: {
    ...mapActions({
      createUser: "signUp"
    }),
    signUp() {
        if (this.user.password === this.confirmedPassword) {
            this.createUser(this.user);
        }
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
