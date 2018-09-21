<template>
    <div id="login" class="section columns">
        <div class="container column is-6">
            <h1 class="title">Welcome!</h1>
            <h2 class="subtitle">We want to get to know you more, so please fill out the form below.</h2>
            <div class="field" @keyup.enter="addInfo">
                <div class="field">
                    <label class="label">What is your first name?</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model.lazy.trim="user.name"/>
                    </div>
                    <p class="help">Nice to meet you, {{ user.name }}!</p>
                </div>
                <div class="field">
                    <label class="label">Tell us about yourself!</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Need a hint? What's your favorite animal?" v-model="user.bio"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button @click="addInfo" class="button is-primary">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                user: {
                    name: '',
                    bio: ''
                }
            }
        },
        methods: {
            ...mapActions(['updateUser']),
            addInfo() {
                this.updateUser(this.user)
            }
        }
    }
</script>

<style scoped>

</style>