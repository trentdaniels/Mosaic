<template>
    <div id="login" class="section">
        <div class="columns">
        <div class="container column is-6">
            <h1 class="title">Sign Up</h1>
            <h2 class="subtitle">Get Creating.</h2>
            <div class="field" @keyup.enter="signUp">
                <div class="field">
                    <label class="label has-text-white">What is your first name?</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model.lazy.trim="user.name"/>
                    </div>
                    <p v-if="user.name.length > 0" class="help">Nice to meet you, {{ user.name }}!</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Email</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Email" v-model.trim="user.email"/>
                    </div>
                    <p class="help">Ex: creative@creative.com</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Password" v-model.trim="user.password"/>
                    </div>
                    <p class="help">Create your password</p>
                </div>
                
                <div class="field">
                    <label class="label has-text-white">Tell us about yourself!</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Need a hint? What's your favorite animal?" v-model="user.bio"></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Oh! One last thing. Why are you using this program?</label>
                    <div class="select is-fullwidth">
                        <select v-model="user.type">
                            <option value="Creative">I want to share my creations everywhere!</option>
                            <option value="Employer">I am an employer looking to employ creatives!</option>
                        </select>
                    </div>
                    <p class="help">We can refine your experience better with this question!</p>
                </div>
                <div class="field">
                    <div class="control">
                        <button @click="signUp" class="button is-primary" :class="{'is-loading': loading}">Get Inspired</button>
                    </div>
                </div>
                
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
      }
    };
  },
  methods: {
    ...mapActions({
      createUser: "signUp"
    }),
    signUp() {
      this.createUser(this.user);
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
