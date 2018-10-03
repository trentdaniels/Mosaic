<template>
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
</template>
<script>
export default {
    name: 'Dropdown'
}
</script>

