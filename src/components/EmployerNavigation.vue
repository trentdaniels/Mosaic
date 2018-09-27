<template>
    <nav id="employerNav" class="navbar">
        <div class="navbar-brand">
            <router-link to="/home" class="navbar-item">Home</router-link>
            <button class="navbar-burger is-primary">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown" :class="{'is-active': isActive}" @click="isActive = !isActive">
                    <a class="navbar-link">My Account</a>
                    <div class="navbar-dropdown is-boxed">
                        <router-link to="/account" class="navbar-item" exact>My Profile</router-link>
                        <router-link to="/account/edit" class="navbar-item" exact>Edit Account</router-link>
                        <router-link to="/account/delete" class="navbar-item has-text-danger" exact>Delete Account</router-link>
                    </div>
                </div>
                <router-link to="/home" @click.native="logout" class="navbar-item">Log Out</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'EmployerNavigation',
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
}
</script>

<style lang="scss" scoped>
    #employerNav .navbar-dropdown .navbar-item {
        color: #00d1b2;
        &:hover {
            color: white;
        }
    }
    #employerNav .navbar-menu > .navbar-item {
        color: rgba(255, 255, 255, 0.7);
        &:hover {
            color: white
        }
    }
    #employerNav .has-dropdown .navbar-link:hover {
        color:white
    }
    #employerNav .has-dropdown .navbar-link {
        color:white;
    }
    #employerNav .has-dropdown .navbar-link::after {
        border-color: white;
    }
    #employerNav .has-dropdown .navbar-link:hover::after {
        border-color: white;
    }
    #employerNav .is-active .navbar-link {
        color: #00d1b2;
        &::after {
            border-color: #00d1b2;
        }
    }
</style>
