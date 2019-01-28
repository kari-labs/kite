<template>
  <div>
    <k-grid>
      <k-card 
        v-for="c in containers" 
        :key="c.name"
        :container="c"
      />
    </k-grid>
  </div>
</template>

<script>
import KGrid from "@/components/containers/Grid.vue";
import KCard from "@/components/containers/Container.vue";

export default {
  data(){
    return {
      containers: []
    };
  },
  async mounted() {
    this.containers = ( await this.$jraph`
      query{
        containers: getAllContainers{
          Name
          State{ Status }
          Config{ Image }
        }
      }
    `).data.containers.map(c => ({
      name: c.Name,
      status: c.State.Status,
      image: c.Config.Image
    }) );
  },
  components: {
    KGrid,
    KCard
  }
};
</script>

<style></style>
