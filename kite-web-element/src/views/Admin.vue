<template>
  <el-row>
    <el-col
      :span="16"
      class="table"
    >
      <k-admin-table />
    </el-col>
    <el-col
      :span="4"
      class="form"
    >
      <k-a-create />
    </el-col>
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
  .form{
    margin-left: 8%;
  }
  .table{
    min-height: 30%;
  }
</style>
