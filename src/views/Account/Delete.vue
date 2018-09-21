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
                <h1 class="title is-1">Oh No!</h1>
                <h3 class="subtitle is-3">Say it ain't so!</h3>
                <div class="field">
                    <label class="label has-text-white">Retype Your email to delete your account</label>
                    <div class="control">
                        <input class="input" type="text" v-model="email" />
                    </div>
                    <p class="help">Are you ABSOLUTELY sure?</p>
                </div>
                <div class="buttons">
                    <button class="button is-danger">Delete</button>
                    <router-link to="/account" class="button is-light" @click.native="cancel">Cancel</router-link>
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    export default {
        name: 'Delete',
        components: {
            Navigation
        },
        data() {
            return {
                email: ''
            }
        },
        computed: {
            ...mapGetters(['userDetails'])
        },
        methods: {
            cancel() {
                this.$emit('cancelled')
            }
        }
    }
</script>

<style scoped>

</style>