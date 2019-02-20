<template>
  <div class="split">
    <div data-v-step="0">
      <k-grid>
        <el-card>
          <h1>You have  {{ containers.length }} containers</h1>
        </el-card>
        <k-card 
          v-for="c in containers" 
          :key="c._id"
          :container="c"
          @openFiles="openFiles"
          @deleted="fetchContainers"
        />
        <k-create-container
          tabindex="0"
          @created="fetchContainers"
          data-v-step="1"
          ref="createContainer"
          @click="$tours['tutorial'].nextStep()"
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
      <k-file-manager :root="user.userid + '/' + selectedContainer" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import KFileManager from "@/components/filesys/FileManager.vue";
import KGrid from "@/components/containers/Grid.vue";
import KCard from "@/components/containers/Container.vue";
import KCreateContainer from "@/components/containers/CreateContainer.vue";

export default {
  data(){
    return {
      containers: [],
      loading: false,
      selectedContainer: '',
      cbs: {
        onNextStep: this.nextStep,
        onPreviousStep: this.prevStep,
        onStop: this.onTourStop,
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
    async fetchContainers(){
      const res = await this.$jraph`
        query{
          containers: getContainers{
            _id
            nickname
            image
            status
          }
        }
      `;
      if(res.errors){
        this.$message.error('An error occured');
      }else{
        this.containers = res.data.containers;
      }
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
    onTourStop(){
      //this.$refs.createContainer.$el.querySelector("#createContainerBtn").click();
    }
  },
  async mounted() {
    await this.fetchContainers();
    //This code only shows the tour when the user visits for the first time
    if(this.$store.state.auth.user.logins === 1){
      this.$tours['tutorial'].start();
    }
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
