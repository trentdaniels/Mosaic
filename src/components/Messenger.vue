<template>
    <div id="messenger">
        <div class="field">
            <label class="label has-text-white">Messaging</label>
            <div class="control">
                <textarea class="textarea" v-model="message"></textarea>
            </div>
            <p class="help">Send a message to this creative!</p>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success" @click="sendMessage">Send Message</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Messenger',
        data() {
            return {
                message: ''
            }
        },
        methods: {
            sendMessage() {
                this.$emit('sentMessage', this.message)
                this.message = ''
            }
            
        }
    }
</script>

<style lang="scss" scoped>
    .textarea {
        white-space: pre-line;
    }
</style>