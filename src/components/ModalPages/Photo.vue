<template>
    <div id="photo" class="modal is-active">
        <div class="modal-background" @click="cancel"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <div class="field">
                    <h1 class="title has-text-dark is-capitalized">{{ photo.description }}</h1>
                    <h3 class="subtitle has-text-dark is-capitalized">{{ photo.user.name }}</h3>
                </div>
                <div class="field">
                    <figure class="image">
                        <img :src="photo.urls.regular" :alt="photo.description" />
                    </figure>
                </div>
                <div class="field">
                    <label class="label">Tags</label>
                    <div class="tags is-centered">
                        <span v-for="(tag, index) in photo.photo_tags" :key="index" class="tag is-light is-large">{{ tag.title }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Additional Information</label>
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr>
                                <td>Height</td>
                                <td>{{ photo.height }} px</td>
                            </tr>
                            <tr>
                                <td>Width</td>
                                <td>{{ photo.width }} px</td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td :style="{'color': photo.color}">{{ photo.color }}</td>
                            </tr>
                            <tr>
                                <td>Likes</td>
                                <td class="has-text-primary">{{ photo.likes }}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </section>
            <footer class="modal-card-foot">
                <a :href="photo.links.html" target="_blank" class="button is-success">View on unSplash</a>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  props: ["photo"],
  name: "Photo",
  methods: {
    cancel() {
      this.$emit("cancelled");
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
    justify-content: center;
}
</style>
