<template>
    <div id="project" class="modal is-active">
        <div class="modal-background" @click="cancel"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <div class="field">
                    <h1 class="title has-text-dark">{{ project.name }}</h1>
                    <h3 class="subtitle has-text-dark" v-for="owner in project.owners" :key="owner.id">{{ owner.display_name }}</h3>
                </div>
                <div class="field">
                    <figure class="image">
                        <img :src="project.covers.original" :alt="project.name" />
                    </figure>
                </div>
                <div class="field">
                    <label class="label">Categories</label>
                    <div class="tags">
                        <span v-for="(field, index) in project.fields" :key="index" class="tag is-light is-large">{{ field }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Stats</label>
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr v-for="(stat, key) in project.stats" :key="key">
                                <td>{{ key }}</td>
                                <td class="has-text-primary">{{ stat }}</td>
                            </tr>
                            <tr>
                                <td>Created</td>
                                <td>{{ dateCreated }}</td>
                                </tr>
                        </tbody>
                        
                    </table>
                </div>
            </section>
            <footer class="modal-card-foot">
                <a :href="project.url" target="_blank" class="button is-success">View on Behance</a>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['project'],
        name: 'Project',
        methods: {
            cancel() {
                this.$emit('cancelled')
            }
        },
        computed: {
            dateCreated() {
                let date = new Date(this.project.created_on)
                return `${date.getMonth() + 1}/${date.getFullYear()}`
            }
        }
    }
</script>

<style scoped>

</style>