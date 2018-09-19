<template>
    <div id="login" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Sign Up</h1>
            <h2 class="subtitle">Get Creating.</h2>
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
                <div class="control">
                    <button class="button is-primary">Register</button>
                </div>
            </div>
            
            <p class="help">Already have an account? <router-link to="/login">Login.</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style scoped>
</style>
