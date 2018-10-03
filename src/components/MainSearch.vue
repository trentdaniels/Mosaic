<template>
  <div id="mainSearch" @keyup.enter="getProjects">
    <label class="label has-text-white">Start Searching:</label>
    <b-field  type="is-primary">
      <b-select placeholder="Purpose" icon="earth" v-model="selectedApi" v-if="user" size="is-medium">
          <option v-for="(api, index) in apis" :key="index" :value="index">
            {{ api }}
          </option>
      </b-select>
      <b-select placeholder="Purpose" icon="earth" v-model="selectedApi" v-else size="is-medium">
          <option v-for="(api, index) in apis" :key="index" :value="index" v-if="index > 0">
            {{ api }}
          </option>
      </b-select>
      <b-input v-model.trim="search" type="text" placeholder="Search Text" size="is-medium" expanded v-if="selectedApi !== 0"></b-input>
      <b-select placeholder="Purpose" v-model="search" v-else size="is-medium" expanded>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
      </b-select>
      <p class="control">
          <button class="button is-primary is-medium" :class="{'is-loading': loading}" @click="getProjects">Search</button>
      </p>
    </b-field>
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
    getProjects() {
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
