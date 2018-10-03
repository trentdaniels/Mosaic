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
            <div class="tags">
                <span v-for="category in categories" :key="category" class="tag is-primary">{{ category }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreationCard',
    props: ['image', 'name', 'description', 'categories']
}
</script>

