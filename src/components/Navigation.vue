<template>
    <nav id="nav" class="navbar">
        <div class="navbar-brand">
            <router-link to="/home" class="navbar-item">Home</router-link>
            <button class="navbar-burger is-primary">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>
        <div class="navbar-menu">
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
                    <div class="navbar-item has-dropdown" :class="{'is-active': isActive}" @click="isActive = !isActive">
                        <a class="navbar-link">My Account</a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/account/creations/create" class="navbar-item" exact>Create</router-link>
                            <router-link to="/account/creations" class="navbar-item" exact>My Creations</router-link>
                            <hr class="dropdown-divider">
                            <router-link to="/account/collections" class="navbar-item">My Collections</router-link>
                            <hr class="dropdown-divider">
                            <router-link to="/account" class="navbar-item" exact>My Profile</router-link>
                            <router-link to="/account/edit" class="navbar-item" exact>Edit Account</router-link>
                            <router-link to="/account/delete" class="navbar-item has-text-danger" exact>Delete Account</router-link>
                        </div>
                    </div>
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
      isActive: false
    };
  }
};
</script>

<style lang="scss" scoped>
#nav .navbar-dropdown .navbar-item {
  color: #00d1b2;
  &:hover {
    color: white;
  }
}
#nav .navbar-menu > .navbar-item {
  color: rgba(255, 255, 255, 0.7);
  &:hover {
    color: white;
  }
}
#nav .has-dropdown .navbar-link:hover {
  color: white;
}
#nav .has-dropdown .navbar-link {
  color: white;
}
#nav .has-dropdown .navbar-link::after {
  border-color: white;
}
#nav .has-dropdown .navbar-link:hover::after {
  border-color: white;
}
#nav .is-active .navbar-link {
  color: #00d1b2;
  &::after {
    border-color: #00d1b2;
  }
}
</style>
