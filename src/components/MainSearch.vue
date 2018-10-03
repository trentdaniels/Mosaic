<template>
  <div id="mainSearch">
    <label class="label has-text-white">Start Searching:</label>
    <b-field @keyup.enter="getProjects" type="is-primary">
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
   
    <template v-if="user">
      <div class="control is-expanded">
        <input type="text" placeholder="ex: Rainbow Dragons" v-model="search" class="input is-medium is-primary" v-if="selectedApi !== 0" />
        <div class="select is-medium is-primary is-fullwidth" v-else>
          <select v-model="search">
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="control is-expanded">
        <input type="text" placeholder="ex: Rainbow Dragons" v-model="search" class="input is-medium is-primary"/>
      </div>
    </template>
    <div class="control">
      <button class="button is-primary is-medium" :class="{'is-loading': loading}" @click="getProjects">Search</button>
    </div>
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
