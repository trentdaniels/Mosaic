<template>
    <div id="article" class="modal is-active">
        <div class="modal-background" @click="cancel"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <div class="field">
                    <h1 class="title has-text-dark">{{ article.title }}</h1>
                    <h3 class="subtitle has-text-dark">{{ article.author }}</h3>
                </div>
                <div class="field">
                    <figure class="image">
                        <img :src="article.urlToImage" :alt="article.description" />
                    </figure>
                </div>
                <div class="field">
                    <label class="label">Source</label>
                    <div class="tags">
                        <span class="tag is-light is-large">{{ article.source.name }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Content</label>
                    <p class="is-italic has-text-dark">{{ article.description }}</p>
                    <p class="has-text-black">{{ article.content }}</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <a :href="article.url" target="_blank" class="button is-success">View on NewsApi</a>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['article'],
        name: 'Article',
        methods: {
            cancel() {
                this.$emit('cancelled')
            }
        }
    }
</script>

<style scoped>

</style>