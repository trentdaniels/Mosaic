<template>
    <nav id="nav" class="navbar is-primary">
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/home" class="navbar-item">Home</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
            <div class="navbar-end">
                <template v-if="user">
                    
                    <div class="navbar-item has-dropdown" :class="{'is-active': isActive}" @click="isActive = !isActive">
                        <a class="navbar-link">Hello {{ user.data.name }}!</a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/account" class="navbar-item has-text-primary" exact>My Profile</router-link>
                            <hr class="dropdown-divider">
                            <router-link to="/account/edit" class="navbar-item has-text-primary" exact>Edit Account</router-link>
                            <router-link to="/account/delete" class="navbar-item has-text-primary" exact>Delete Account</router-link>
                        </div>
                    </div>
                    <router-link to="/account/collections" class="navbar-item">My Collections</router-link>
                    <router-link to="/home" @click.native="logout" class="navbar-item">Log Out</router-link>
                </template>
                <template v-else>
                    <router-link to="/login" class="navbar-item">Log In</router-link>
                    <router-link to='/signup' class="navbar-item">Sign Up</router-link>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(['user']),
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
