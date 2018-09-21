<template>
    <div>
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
            <button class="button is-success">Save</button>
            <router-link to="/account" class="button is-light" @click.native="cancel" >Cancel</router-link>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Edit',
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
            cancel() {
                this.$emit('cancelled')
            }
        }
    }
</script>

<style scoped>

</style>