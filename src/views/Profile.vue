<template>
    <div id="details">
      <div class="hero-head">
        <div class="container">
            <navigation v-if="user.data.type === 'Creative'"></navigation>
            <employer-navigation v-else></employer-navigation>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title is-1">Meet {{ profile.name }}.</h1>
                <h3 class="subtitle is-3">(Pretty good name if you ask me)</h3>
            </div>
          <div class="column is-4">
            <h1 class="title is-6">Profile View</h1>
            <h2 class="subtitle is-6">Get to know this creative!</h2>
            <template v-if="id !== user.id && user.data.type === 'Creative'">
                <div class="field">
                    <template v-if="isFollowing === false">
                        <label class="label has-text-white is-outline">Like what you see?</label>
                        <div class="control">
                            <button class="button is-primary" :class="{'is-loading':loading}" @click="follow" >Follow this Creative</button>
                        </div>
                        <p class="help">You won't regret it!</p>
                    </template>
                    <template v-else>
                        <label class="label has-text-white">Good for you!</label>
                        <div class="control">
                            <button class="button is-primary" disabled>Following</button>
                        </div>
                        <p class="help">You're already following!</p>
                    </template>
                </div>
                <messenger @sentMessage="sendMessage"></messenger>
            </template>
            <template v-else-if="user.data.type === 'Employer'">
                <p>Feel free to contact this creative for employment!</p>
                <messenger @sentMessage="sendMessage"></messenger>
            </template>
            
          </div>
            <div class="column is-6 is-offset-2">
                <div class="field">
                    <label class="label has-text-white">Bio:</label>
                    <p>{{ profile.bio }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Contact Info:</label>
                    <p>{{ profile.email }}</p>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Creations:</label>
                    <div class="tags is-multiline">
                        <span v-for="(creation, index) in profile.creations" :key="index" class="tag is-info">{{ creation.name }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">Current Collections:</label>
                    <div class="tags is-multiline">
                        <span class="tag is-light" v-for="(collection, index) in profile.collections" :key="index">{{ collection.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/Navigation.vue";
import EmployerNavigation from "@/components/EmployerNavigation.vue";
import Messenger from "@/components/Messenger.vue";
export default {
  name: "Profile",
  components: {
    Navigation,
    EmployerNavigation,
    Messenger
  },
  props: ["id"],
  computed: {
    ...mapGetters(["user", "profile", "isLoading"]),
    isFollowing() {
      return this.user.data.followedCreatives.includes(this.id);
    },
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions([
      "fetchUser",
      "destroyProfile",
      "followCreative",
      "messageUser"
    ]),
    follow() {
      this.followCreative(this.id);
    },
    sendMessage(message) {
      this.messageUser({ userId: this.id, message: message });
    }
  },
  beforeDestroy() {
    this.destroyProfile();
  }
};
</script>

<style scoped>
</style>
