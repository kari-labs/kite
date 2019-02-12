<template>
  <div>
    <k-grid>
      <k-card 
        v-for="c in containers" 
        :key="c._id"
        :container="c"
        @deleted="fetchContainers"
      />
      <k-create-container @created="fetchContainers" />
    </k-grid>
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
      
    }
  },
  async mounted() {
    await this.fetchContainers();
  },
  components: {
    KGrid,
    KCard,
    KCreateContainer,
  }
};
</script>

<style></style>
