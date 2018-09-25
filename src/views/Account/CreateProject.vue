<template>
    <div id="create">
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
                <h1 class="title is-1">Creation Details</h1>
                <h3 class="subtitle is-3">Let's change it up a bit.</h3>
                <div class="field">
                    <label class="label has-text-white">Creation Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="project.name" placeholder="Project Name"/>
                    </div>
                    <p class="help">What is your project's name?</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Category</label>
                    <div class="control">
                        <input class="input" type="email" v-model="project.category" placeholder="Project Category"/>
                    </div>
                    <p class="help">Illustration, Website, etc... But Please choose one!</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Description</label>
                    <div class="control">
                        <textarea class="textarea" v-model="project.description" style="whitespace: pre-line" placeholder="Project Description"></textarea>
                    </div>
                    <p class="help">Talk about your project. The world would love to know!</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Image Upload</label>
                    <div class="file has-name">
                        <label class="file-label">
                        <input class="file-input" ref="file" type="file" accept="image/*" @change="handleFile" />
                        <span class="file-cta">
                            <span class="file-label">
                                Upload Image Here
                            </span>
                        </span>
                        <span class="file-name">{{ fileName }}</span>
                        </label>
                    </div>
                    <p class="help">Make the picture unique!</p>
                </div>
                <div class="field">
                    <div class="control">
                        <button @click="submitProject" class="button is-dark">Create Project</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue'
    import { mapActions } from 'vuex'
    export default {
        name: 'CreateProject',
        components: {
            Navigation
        },
        data() {
            return {
                project: {
                    name: '',
                    description: '',
                    category: '',
                    image: null,
                    file: null
                },
                fileName: 'Your Project Image',
                
            }
        },
        methods: {
            ...mapActions(['createProject']),
            handleFile() {
                this.project.file = this.$refs.file.files[0]
                this.fileName = this.project.file.name
            },
            submitProject() {
                this.createProject(this.project)
            }
        }
    }
</script>

<style scoped>

</style>