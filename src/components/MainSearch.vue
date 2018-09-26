<template>
  <div id="mainSearch">
    <label class="label has-text-white">Start Searching:</label>
    <div  class="field has-addons" @keyup.enter="getProjects">
    <div class="control">
      <div class="select is-medium is-primary">
        <select v-model="selectedApi">
          <option v-for="(api, index) in apis" :key="index" :value="index">
            {{ api }}
          </option>
        </select>
      </div>
    </div>
    <div class="control is-expanded">
      <input type="text" placeholder="ex: Rainbow Dragons" v-model="search" class="input is-medium is-primary" />
    </div>
    <div class="control">
      <button class="button is-primary is-medium" :class="{'is-loading': loading}" @click="getProjects">Search</button>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "MainSearch",
  data() {
    return {
      search: '',
      selectedApi: 0
    }
  },
  computed: {
    ...mapGetters(['apis', 'isLoading']),
    loading() {
      return this.isLoading
    },
    encodedSearch() {
      return encodeURIComponent(this.search)
    }
  },
  methods: {
    getProjects() {
      this.$emit('searched', {
        url: this.encodedSearch,
        api: this.selectedApi
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
