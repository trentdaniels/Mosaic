<template>
    <nav id="nav" class="navbar">
        <div class="navbar-brand">
            <router-link to="/home" class="navbar-item">Home</router-link>
            <button class="navbar-burger is-primary" :class="{'is-active': menuClicked}" @click="menuClicked = !menuClicked">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>
        
        <div class="navbar-menu" :class="{'is-active': menuClicked}">
          <template v-if="user">
            <div class="navbar-start">
                <router-link to="/timeline" class="navbar-item">Timeline</router-link>
                <router-link to="/messages" class="navbar-item">Messages</router-link>
            </div>
          </template>
            <div class="navbar-end">
                <template v-if="user">
                    <router-link to="/account/creations" class="navbar-item" exact>My Creations</router-link>
                    <router-link to="/account/collections" class="navbar-item">My Collections</router-link>
                    <b-dropdown>
                      <a class="navbar-item" slot="trigger">
                        <span>Account</span>
                        <b-icon icon="menu-down"></b-icon>
                      </a>

                      <b-dropdown-item has-link>
                        <router-link to="/account/creations/create" exact>Create</router-link>
                      </b-dropdown-item>
                      <b-dropdown-item has-link>
                        <router-link to="/account/creations" exact>My Creations</router-link>
                      </b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item has-link>
                        <router-link to="/account/collections" exact>My Collections</router-link>
                      </b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item has-link>
                        <router-link to="/account" exact>My Profile</router-link>
                      </b-dropdown-item>
                      <b-dropdown-item has-link>
                        <router-link to="/account/edit" exact>Edit Account</router-link>
                      </b-dropdown-item>
                      <b-dropdown-item has-link>
                        <router-link to="/account/delete" exact>Delete Account</router-link>
                      </b-dropdown-item>

                      
                    </b-dropdown>
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
import Dropdown from "@/components/Navigation/Dropdown.vue";
export default {
  components: {
    Dropdown
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["clearUser"]),
    logout() {
      this.clearUser();
    }
  },
  data() {
    return {
      isActive: false,
      menuClicked: false
    };
  }
};
</script>

<style lang="scss" scoped>
#nav {
  .has-link {
    a {
      color: #00d1b2;
      &:hover {
        background-color: #00d1b2;
        color: white;
      }
    }
  }
}
</style>
