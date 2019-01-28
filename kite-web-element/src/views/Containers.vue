<template>
  <div>
    <k-grid>
      <k-card 
        v-for="o in 4" 
        :key="o"
      />
    </k-grid>
  </div>
</template>

<script>
import KGrid from "@/components/containers/Grid.vue";
import KCard from "@/components/containers/Container.vue";

export default {
  components: {
    KGrid,
    KCard
  }
};
</script>

<style></style>
