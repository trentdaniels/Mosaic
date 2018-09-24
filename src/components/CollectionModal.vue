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
                <template v-if="collectionExists">
                    <div class="panel" :class="{'is-active': isActive}">
                        <p class="panel-heading" v-if="user.collections.length > 0">Your Collections</p>
                        <div class="panel-block" v-for="(collection,index) in user.collections" :key="index" :class="{'is-active': collection.name === chosenCollection}">
                            <div class="control">
                                <p @click="chosenCollection = collection.name" :class="{'has-text-weight-bold': collection.name === chosenCollection}"><a>{{ collection.name }}</a></p>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="field">
                        <label class="label">Save to new Collection</label>
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
                </template>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="save">Save</button>
                <button class="button" @click="cancel">Cancel</button>
                <button @click="collectionExists = !collectionExists" class="button" v-if="collectionExists">Add New</button>
                <button @click="collectionExists = !collectionExists" class="button" v-else>Choose Existing</button>
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
                this.user.collections.forEach((collection) => {
                    if(collection.name === this.newCollection) {
                        alert('Oops, this collection already exists! Try another name')
                        return;
                    }
                })
                this.$emit('addedNewCollection', this.newCollection)
            },
            save(){
                this.$emit('saved', this.chosenCollection)
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
                newCollection: '',
                chosenCollection: '',
                isActive: false,
                collectionExists: true,
            }
        }
    }
</script>

<style scoped>

</style>