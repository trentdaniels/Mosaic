<template>
    <div id="collection-modal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card" v-if="project.type === 'project'">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ project.data.name }}</p>
                <button class="delete" @click="cancel"></button>
            </header>
            <section class="modal-card-body">
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save</button>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CollectionModal',
        props: ['project'],
        methods: {
            cancel() {
                this.$emit('cancelled')
            }
        }
    }
</script>

<style scoped>

</style>