<template>
    <nav id="nav" class="navbar is-primary">
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/home" class="navbar-item">Home</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
            <div class="navbar-end">
                <template v-if="isLoggedIn">
                    <div class="navbar-item has-dropdown" :class="{'is-active': isActive}" @click="isActive = !isActive">
                        <a class="navbar-link">Manage Account</a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/account" class="navbar-item has-text-primary">My Profile</router-link>
                            <router-link to="/account/edit" class="navbar-item has-text-primary">Edit Account</router-link>
                            <router-link to="/account/delete" class="navbar-item has-text-primary">Delete Account</router-link>
                        </div>
                    </div>
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
    },
    data() {
        return {
            isActive: false
        }
    }
};
</script>

<style lang="scss" scoped>
    
</style>
