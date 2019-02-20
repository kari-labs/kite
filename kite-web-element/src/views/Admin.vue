<template>
  <el-row class="all">
    <el-col
      :span="16"
      class="table"
    >
      <k-admin-table ref="table" />
      <!-- Create a prop on this element that you can bind to an array of users -->
    </el-col>
    <el-col
      :span="4"
      class="form"
    >
      <k-a-create @created:user="updateTable" />
      <!-- THis would stay the same -->
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
  },
  methods: {
    async updateTable() {
      /* You would call an apollo query */
    }
  }
}
</script>

<style>
  .all{
    margin-left: 4%;
    margin-right: 4%;
  }
  .form{
    float: right;
  }
</style>
