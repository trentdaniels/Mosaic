<template>
  <div id="mainSearch">
    <label class="label">Start Searching:</label>
    <div  class="field has-addons">
    <div class="control">
      <span class="select is-medium is-primary">
        <select>
          <option v-for="(target, index) in targets" :key="index">
            {{ target }}
          </option>
        </select>
      </span>
    </div>
    <div class="control is-expanded">
      <input type="text" placeholder="ex: Rainbow Dragons" v-model="search" class="input is-medium is-primary" />
    </div>
    <div class="control">
      <button class="button is-primary is-medium">Search</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "MainSearch",
  props: {
    targets: Array
  },
  data() {
    return {
      search: ''
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
