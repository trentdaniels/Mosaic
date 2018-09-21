<template>
    <nav id="nav" class="navbar is-primary">
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/home" class="navbar-item">Home</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
            <div class="navbar-end">
                <template v-if="isLoggedIn">
                    <router-link to="/home" @click.native="logout" class="navbar-item">Log Out</router-link>
                </template>
                <template v-else>
                    <router-link to="/login" class="navbar-item">Log In</router-link>
                </template>
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
