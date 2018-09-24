<template>
    <div id="collection-modal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" v-if="project.type === 'project'">{{ project.data.name }}</p>
                <p class="modal-card-title" v-else-if="project.type === 'article'">{{ project.data.title }}</p>
                <p class="modal-card-title" v-else-if="project.type === 'photo'">{{ project.data.description }}</p>
                <button class="delete" @click="cancel"></button>
            </header>
            <section class="modal-card-body">
                <div class="dropdown is-active" v-if="user.collections">
                    <div class="dropdown-trigger">
                        <button class="button">Choose a Collection</button>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item" v-for="(collection,index) in user.collections" :key="index" >
                                <button class="button" @click="collection.name">{{ collection.name }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Create a Collection</label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input class="input" type="text" v-model="newCollection" />
                        </div>
                        <div class="control">
                            <button class="button is-success" @click="addNewCollection">Add New</button>
                        </div>      
                    </div>
                    <p class="help has-text-dark">Make it creative!</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="save">Save</button>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'CollectionModal',
        props: ['project'],
        methods: {
            cancel() {
                this.$emit('cancelled')
            },
            addNewCollection() {
                this.$emit('addedNewCollection', this.newCollection)
            },
            save(){
                this.$emit('saved')
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
                newCollection: '',
                chosenCollection: null
            }
        }
    }
</script>

<style scoped>

</style>