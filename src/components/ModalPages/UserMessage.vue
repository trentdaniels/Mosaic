<template>
    <div id="article" class="modal is-active">
        <div class="modal-background" @click="cancel"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Message to {{ sender }}</p>
                <button class="delete" @click="cancel"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Reply</label>
                    <div class="control">
                        <textarea class="textarea" v-model="newMessage"></textarea>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="send">Send</button>
                <button class="button is-light" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  name: "UserMessage",
  methods: {
    cancel() {
      this.$emit("cancelled");
    },
    send() {
      this.$emit("sent", this.newMessage);
    }
  },
  props: ["sender"],
  data() {
    return {
      newMessage: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.modal-card-head {
  border-bottom: none;
  background-color: #00d1b2;
  .modal-card-title {
    color: white;
  }
}
.textarea {
  white-space: pre-line;
}
.modal-card-body {
  .field {
    .label {
      color: #00d1b2;
    }
  }
}
.modal-card-foot {
  border-top: none;
  background-color: white;
}
</style>
