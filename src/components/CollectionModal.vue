<template>
    <div id="collection-modal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" v-if="project.type === 'project'">{{ project.data.name }}</p>
                <p class="modal-card-title" v-else-if="project.type === 'article'">{{ project.data.title }}</p>
                <p class="modal-card-title" v-else-if="project.type === 'photo'">{{ project.data.description }}</p>
                <button class="delete" @click="cancel"></button>
            </header>
            <section class="modal-card-body">
            
                <div class="panel" :class="{'is-active': isActive}">
                    <p class="panel-tabs">
                        <a v-for="(action,index) of actions" :key="index" @click="chosenAction = action" :class="{'is-active': action === chosenAction}">{{ action }}</a>
                    </p>
                    <template v-if="chosenAction === 'Choose Existing'">
                        <div class="panel-block" v-for="(collection,index) in user.collections" :key="index" :class="{'is-active': collection.name === chosenCollection}">
                            <div class="control">
                                <p @click="toggleClicked(collection.name)" :class="{'has-text-weight-bold': collection.name === chosenCollection}"><a>{{ collection.name }}</a></p>
                            </div>
                        </div>
                    </template>                   
                    <template v-else>
                        <div class="panel-block">
                            <input class="input" type="text" v-model="chosenCollection" />
                        </div>    
                    </template>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="handleSubmission">Save</button>
                <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CollectionModal",
  props: ["project"],
  methods: {
    cancel() {
      this.$emit("cancelled");
    },
    addNewCollection() {
      this.user.collections.forEach(collection => {
        if (collection.name === this.chosenCollection) {
          alert("Oops, this collection already exists! Try another name");
          return;
        }
      });
      this.$emit("addedNewCollection", this.chosenCollection);
    },
    save() {
      this.$emit("saved", this.chosenCollection);
    },
    handleSubmission() {
        if(this.chosenAction === 'Choose Existing') {
            this.save()
        }
        else if(this.chosenAction === 'Create New') {
            this.addNewCollection()
        }
    },
    toggleClicked(collectionName) {
        if (this.chosenCollection !== collectionName) {
            this.chosenCollection = collectionName
        }
        else {
            this.chosenCollection = ''
        }
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      chosenCollection: "",
      isActive: false,
      collectionExists: true,
      actions: ['Choose Existing', 'Create New'],
      chosenAction: 'Choose Existing'
    };
  }
};
</script>

<style lang="scss" scoped>
#collection-modal {
    .panel-tabs a {
        color: #00d1b2;
    }
    .modal-card-head {
        background-color: #00d1b2;
        border-bottom: none;
        .modal-card-title {
            color: white;
        }
    }
    .modal-card-foot {
        background-color: white;
        border-top: none;
    }
    .panel-block {
        &.is-active {
            border-left-color: #00d1b2;
            background-color: #00d1b2;
            color: white;
        }
    }
}

</style>
