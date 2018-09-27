<template>
    <div id="edit">
    <section class="hero is-bold is-fullheight is-primary">
      <div class="hero-head">
        <div class="container">
         <template v-if="user.data.type === 'Creative'">
            <navigation></navigation>
        </template>
        <template v-else>
            <employer-navigation></employer-navigation>
        </template>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-centered">
            <div class="column is-6">
                <h1 class="title">Someone once said that change is for the better.</h1>
                <h2 class="subtitle">This change is not. Don't delete!</h2>
                <p>It'll make us sad, and no one likes sad.</p>
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
                    <button @click="deleteAccount" class="button is-danger" :class="{'is-loading': loading}">Delete</button>
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
    import { mapGetters, mapActions } from 'vuex'
    import Navigation from '@/components/Navigation.vue'
    import EmployerNavigation from '@/components/EmployerNavigation.vue'
    export default {
        name: 'Delete',
        components: {
            Navigation,
            EmployerNavigation
        },
        data() {
            return {
                email: ''
            }
        },
        computed: {
            ...mapGetters(['user', 'isLoading']),
            loading() {
                return this.isLoading
            }
        },
        methods: {
            ...mapActions(['deleteUser']),
            cancel() {
                this.$emit('cancelled')
            },
            deleteAccount() {
                if(this.email === this.user.data.email) {
                    this.deleteUser()
                }
                else {
                    alert('That\'s the wrong email!')
                }
            }
        }
    }
</script>

<style scoped>

</style>