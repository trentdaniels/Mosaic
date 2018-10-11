<template>
    <div id="creations">
            <div class="hero-head">
                <div class="container">
                <navigation></navigation>
                </div>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-3">
                            <h1 class="title is-1">Your Creations</h1>
                            <h2 class="subtitle">View your creations here!</h2>
                            <p> Feeling inspired? Well you can make a new creation by clicking  <router-link  class="has-text-weight-bold" to="creations/create">Here</router-link>.</p>
                        </div>
                        <div class="column is-9">
                            <div class="columns is-multiline">
                                    <div class="column is-4" v-for="(creation,index) in user.creations" :key="index">
                                        <keep-alive>
                                            <creation-card 
                                                :image ="creation.image" 
                                                :name="creation.name" 
                                                :description="creation.description" 
                                                :categories="creation.categories">
                                            </creation-card>
                                        </keep-alive>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreationCard from "@/components/Cards/CreationCard.vue";
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Creations",
  components: {
    Navigation,
    CreationCard
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss" scoped>
</style>
