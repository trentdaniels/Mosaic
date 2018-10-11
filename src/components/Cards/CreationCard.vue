<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img :src="image" alt="Creation Picture" />
            </figure>
        </div>
        <div class="card-header">
            <h1 class="card-header-title is-centered has-text-dark">{{ name }}</h1>
        </div>
        <div class="card-content">
            <div class="field">
                <p>{{ description }}</p>
            </div>
            <div class="tags is-centered">
                <span v-for="category in categories" :key="category" class="tag is-primary">{{ category }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CreationCard",
  props: ["image", "name", "description", "categories"]
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  .card-image {
    overflow: hidden;
    height: 256px;
    .image {
      overflow: hidden;
      height: 100%;
      img {
        object-fit: cover;
        object-position: top;
        height: 100%;
      }
    }
  }
  .card-content {
      .field {
          p {
              text-align: center;
          }
      }
      text-align: center;
  }
}
</style>
