<template>
    <div id="edit">
    <section class="hero is-bold is-fullheight is-primary">
      <div class="hero-head">
        <div class="container">
         <navigation></navigation>
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
                        <input class="input" type="text" v-model="user.name" :placeholder="userDetails.name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Email:</label>
                    <div class="control">
                        <input class="input" type="email" v-model="user.email" :placeholder="userDetails.email"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Bio:</label>
                    <div class="control">
                        <textarea class="textarea" v-model="user.bio" :placeholder="userDetails.bio"></textarea>
                    </div>
                </div>
                <div class="buttons">
                    <button class="button is-success" @click="updateInfo">Save</button>
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
    import { mapGetters, mapActions } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    export default {
        name: 'Edit',
        components: {Navigation},
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    bio: ''
                }
            }
        },
        computed: {
            ...mapGetters(['userDetails'])
        },
        methods: {
            ...mapActions(['editUser']),
            updateInfo() {
                this.editUser(this.user)
            }
        }
    }
</script>

<style scoped>

</style>