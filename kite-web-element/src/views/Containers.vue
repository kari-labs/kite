<template>
  <div class="split">
    <div data-v-step="0">
      <k-grid v-loading="$apollo.loading">
        <k-card 
          v-for="c in containers.filter(c => $route.name === 'trash' ? c.deleted : !c.deleted)"
          :key="c._id"
          :container="c"
          @openFiles="openFiles"
          @deleted="fetchContainers"
          @restored="fetchContainers"
        />
        <k-create-container
          tabindex="0"
          @created:container="fetchContainers"
          data-v-step="1"
          ref="createContainer"
          @click="$tours['tutorial'].nextStep()"
          v-if="$route.name !== 'trash'"
        />
      </k-grid>
      <v-tour
        name="tutorial"
        :steps="steps"
        :callbacks="cbs"
      />
    </div>
    <div
      v-show="selectedContainer != ''"
      style="flex: 0.5;"
    >
      <k-file-manager :root="selectedContainer" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import KFileManager from "@/components/filesys/FileManager.vue";
import KGrid from "@/components/containers/Grid.vue";
import KCard from "@/components/containers/Container.vue";
import KCreateContainer from "@/components/containers/CreateContainer.vue";
import gql from "graphql-tag";

export default {
  data(){
    return {
      containers: [],
      loading: false,
      selectedContainer: '',
      cbs: {
        onNextStep: this.nextStep,
        onPreviousStep: this.prevStep,
      },
      steps: [
        {
          target: '[data-v-step="0"]',
          content: 'This is the containers page, where all the magic happens',
          params: {
            placement: 'bottom'
          }
        },
        {
          target: '[data-v-step="1"]',
          content: 'Click here to create a container',
          params: {
            placement: 'bottom'
          }
        },
        {
          target: '[data-v-step="2"]',
          content: 'Go ahead and give your container name',
          params: {
            placement: 'right'
          }
        },
        {
          target: '[data-v-step="3"]',
          content: 'Go ahead and pick the image for your container here',
          params: {
            placement: 'right'
          }
        },
        {
          target: '[data-v-step="4"]',
          content: 'Click here to create your container',
          params: {
            placement: 'bottom'
          }
        },
      ],
    };
  },
  computed: {
    ...mapState({user: state => state.auth.user})
  },
  methods: {
    fetchContainers () {
      this.$apollo.queries.containers.refetch();
    },
    openFiles(containerName) {
      console.log('open', containerName)
      if(this.selectedContainer == containerName)
        this.selectedContainer = ''
      else
        this.selectedContainer = containerName;
    },
    async nextStep(currentStep) {
      if(currentStep === 1) {
        await this.$refs.createContainer.$el.querySelector(".new").click();
        await this.$tours['tutorial'].start(2);
      }
    },
    prevStep(currentStep) {
      if(currentStep === 2) {
        this.$refs.createContainer.$el.querySelector("#closeDialog").click();
      }
    },
  },
  apollo: {
    containers: {
      query: gql`
        {
          containers: getContainers{
            _id
            nickname
            image
            status
            deleted
          }
        }`,
        skip: false,
    }
  },
  mounted() {
    console.log(this.containers)
    if(this.$store.state.auth.user.logins === 1) {
      this.$tours['tutorial'].start();
    }
    this.triggerMyQuery();
  },
  components: {
    KGrid,
    KCard,
    KCreateContainer,
    KFileManager,
  },
};
</script>

<style>
.split {
  display: flex;
  height: 100%;
}
.split > div{
  position: relative;
  flex: 1;
  height: 100%;
}
.split > div:not(:first-child) {
  padding-left: 20px;
}
.split > div:not(:first-child)::before {
  content: '';
  position: absolute;
  left: -2px;
  width: 1px;
  height: 100%;
  background-color:rgb(128, 128, 128, 0.5);
}
.v-step {
  z-index: 150173408139270;
}
</style>
