<template>
    <nav id="nav">
        <div class="field is-grouped">
            <router-link to="/home" class="button">Home</router-link>
            <router-link to="/about" class="button">About</router-link>
            <button @click="logout" v-if="isLoggedIn" class="button">Log Out</button>
            <router-link to="/login" v-else class="button">Log In</router-link>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";
export default {
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    methods: {
        ...mapActions(["clearUser"]),
        logout() {
        firebase
            .auth()
            .signOut()
            .then(
            () => {
                this.clearUser();
                this.$router.replace("login");
            },
            err => {
                alert(`Oh no! ${err.message}`);
            }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  button {
        font-weight: bold;
        color: #2c3e50;
  }
}
</style>
