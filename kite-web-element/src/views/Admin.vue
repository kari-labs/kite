<template>
  <div>
    <k-admin-table />
    <k-a-create />
  </div>
</template>

<script>
import KAdminTable from "@/components/admin/ATable.vue";
import KACreate from "@/components/admin/AUserCreate.vue";
export default {
  components: {
    KAdminTable
  }
}
</script>

<style>

</style>
