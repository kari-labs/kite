<template>
  <div data-v-step="0">
    <k-grid>
      <el-card>
        <h1>You have  {{ containers.length }} containers</h1>
      </el-card>
      <k-card 
        v-for="c in containers" 
        :key="c._id"
        :container="c"
        @deleted="fetchContainers"
      />
      <k-create-container @created="fetchContainers" data-v-step="1" ref="createContainer" @click="$tours['tutorial'].nextStep()"/>
    </k-grid>
    <v-tour name="tutorial" :steps="steps" :callbacks="cbs"></v-tour>
  </div>
</template>

<script>
import KGrid from "@/components/containers/Grid.vue";
import KCard from "@/components/containers/Container.vue";
import KCreateContainer from "@/components/containers/CreateContainer.vue";

export default {
  data(){
    return {
      containers: [],
      loading: false,
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
        console.log(res.errors);
        this.$message.error('An error occured');
      }else{
        this.containers = res.data.containers;
      }
      
    },
    async nextStep(currentStep) {
      if(currentStep === 1) {
        console.log(this.$refs.createContainer.$el);
        await this.$refs.createContainer.$el.querySelector(".new").click();
        await this.$tours['tutorial'].start(2);
      }
    },
    prevStep(currentStep) {
      if(currentStep === 2) {
        console.log(this.$refs.createContainer.$el);
        this.$refs.createContainer.$el.querySelector("#closeDialog").click();
      }
    },
    onTourStop(){
      this.$refs.createContainer.$el.querySelector("#createContainerBtn").click();
    }
  },
  async mounted() {
    await this.fetchContainers();
    console.log(this.$store.state.auth.user);
    //This code only shows the tour when the user visits for the first time
    if(!localStorage.getItem("previousVisitor")){
      this.$tours['tutorial'].start();
      localStorage.setItem("previousVisitor", true);
    }
  },
  components: {
    KGrid,
    KCard,
    KCreateContainer,
  }
};
</script>

<style>
.v-step {
  z-index: 150173408139270;
}
</style>
