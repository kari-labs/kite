<template>
  <el-row :gutter="20">
    <el-col><k-admin-table /></el-col>
    <el-col><k-a-create /></el-col>
  </el-row>
</template>

<script>
import KAdminTable from "@/components/admin/Table.vue";
import KACreate from "@/components/admin/UserCreate.vue";
export default {
  components: {
    KAdminTable,
    KACreate
  }
}
</script>

<style>

</style>
