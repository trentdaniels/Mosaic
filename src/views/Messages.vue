<template>
    <div id="messages">
            <div class="hero-head">
                <div class="container">
                <navigation v-if="user.data.type === 'Creative'"></navigation>
                <employer-navigation v-else></employer-navigation>
                </div>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-3">
                            <h1 class="title is-1">Your Messages</h1>
                            <h2 class="subtitle">This is your inbox. Check here for updates to your messages!</h2>
                        </div>
                        <div class="column is-9">
                            <div class="columns is-multiline">
                                    <div class="column is-4" v-for="(message,index) in sortedMessages" :key="index">
                                        <keep-alive>
                                            <div class="card">
                                                <div class="card-content">
                                                    <h1 class="title has-text-dark">{{ message.from }}</h1>
                                                    <div class="field">
                                                        <p>{{ message.message }}</p><br>
                                                        <p class="is-size-7">{{ getTime(message.sent) }}</p>
                                                    </div>
                                                </div>
                                                <div class="card-footer">
                                                    <a @click="showReply(message.senderId, message.from)" class="card-footer-item has-background-primary has-text-white">Reply</a>
                                                    <router-link :to="{ name: 'userProfile', params: {id: message.senderId}}" class="card-footer-item has-text-white has-background-link">View Profile</router-link>
                                                </div>
                                                
                                            </div>
                                            <template >
                                                <user-message :sender="recipientName" @cancelled="cancel" @sent="sendMessage" v-if="replying"></user-message>
                                            </template>
                                        </keep-alive>
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
import UserMessage from "@/components/ModalPages/UserMessage.vue";
import EmployerNavigation from "@/components/EmployerNavigation.vue";
import firebase from "firebase";
import "firebase/firestore";
export default {
  name: "Messages",
  components: {
    Navigation,
    UserMessage,
    EmployerNavigation
  },
  computed: {
    ...mapGetters(["user"]),
    sortedMessages() {
      let sortedMessages = this.sortMessages();
      return sortedMessages.reverse();
    }
  },
  data() {
    return {
      recipientId: "",
      recipientName: "",
      replying: false
    };
  },
  methods: {
    ...mapActions(["messageUser", "getUser"]),
    getTime(time) {
      let date = new Date(time);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let day = date.getDate() + 1;
      return `${month}/${day}/${year} at ${hours}:${minutes}`;
    },
    showReply(senderId, senderName) {
      (this.recipientId = senderId), (this.recipientName = senderName);
      this.replying = true;
    },
    cancel() {
      this.recipientId = "";
      this.recipientName = "";
      this.replying = false;
    },
    async sendMessage(message) {
      this.replying = false;
      await this.messageUser({ userId: this.recipientId, message: message });
      this.recipientId = "";
      this.recipientName = "";
    },
    updateMessages() {
      const db = firebase.firestore();
      db.collection("users")
        .doc(this.user.id)
        .onSnapshot(doc => {
          this.getUser(doc.id);
        });
    },
    sortMessages() {
      function compare(a, b) {
        if (a.created < b.created) return -1;
        else if (a.created > b.created) return 1;
        else return 0;
      }
      let sortedMessages = this.user.data.messages.sort(compare);
      return sortedMessages;
    }
  },
  beforeMount() {
    this.getUser(this.user.id);
  },
  mounted() {
    this.updateMessages();
  }
};
</script>

<style scoped lang="scss">
.card-footer-item:not(:last-child) {
  border-right: none;
}
</style>
