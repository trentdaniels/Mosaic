<template>
    <div id="login">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" v-model.trim="user.email"/>
        <input type="password" placeholder="Password" v-model.trim="user.password"/>
        <button>Connect</button>
        <p>Don't have an account? Create one <router-link>Here</router-link></p>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>