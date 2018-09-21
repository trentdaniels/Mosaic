<template>
    <nav id="nav" class="navbar is-primary">
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/home" class="navbar-item">Home</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
            <div class="navbar-end">
                <router-link to="/home" @click.native="logout" v-if="isLoggedIn" class="navbar-item">Log Out</router-link>
                <router-link to="/login" v-else class="navbar-item">Log In</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    methods: {
        ...mapActions(["clearUser"]),
        logout() {
            this.clearUser();
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
