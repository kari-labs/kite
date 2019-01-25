<template>
  <div>
    <k-grid>
      <k-ontainer 
        v-for="o in 4" 
        :key="o"
      />
    </k-grid>
  </div>
</template>

<script>
import KGrid from "@/components/containers/Grid.vue";
import KOntainer from "@/components/containers/Container.vue";

export default {
  components: {
    KGrid,
    KOntainer
  }
};
</script>

<style></style>
