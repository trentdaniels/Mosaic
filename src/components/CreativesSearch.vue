<template>
    <div id="creativesSearch">
        <label class="label has-text-white">Start Searching:</label>
        <div  class="field has-addons" @keyup.enter="getCreations">
            <div class="control">
                <button class="button is-static is-medium">Creations</button>
            </div>
            <div class="control is-expanded">
                <div class="select is-medium is-primary is-fullwidth">
                    <select v-model="search">
                        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button class="button is-primary is-medium" :class="{'is-loading': loading}" @click="getCreations">Search</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainSearch",
  data() {
    return {
      search: "Digital",
      selectedApi: 0
    };
  },
  computed: {
    ...mapGetters(["apis", "isLoading", "categories", "user"]),
    loading() {
      return this.isLoading;
    },
    encodedSearch() {
      return encodeURIComponent(this.search);
    }
  },
  methods: {
    getCreations() {
      this.$emit("searched", {
        url: this.encodedSearch,
        api: this.selectedApi
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
