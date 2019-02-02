<template>
  <div>
    <k-grid>
      <k-card 
        v-for="c in containers" 
        :key="c.name"
        :container="c"
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
    };
  },
  methods: {
    async fetchContainers(){
      this.containers = ( await this.$jraph`
        query{
          containers: getContainers{
            nickname
            image
            status
          }
        }
      `).data.containers;
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
