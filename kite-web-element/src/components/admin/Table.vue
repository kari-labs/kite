<template>
  <el-card class="box-card">
    <el-table
      :data="usersTable"
      class="table"
    >
      <el-table-column
        fixed
        prop="userid"
        label="UserID"
        width="150"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="120"
      />
      <el-table-column
        prop="containers"
        label="Containers"
        width="120"
      />
      <el-table-column
        prop="scope"
        label="Scope"
        width="120"
      />
      <el-table-column
        label="Operations"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  
  name: "KATable",
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
  data() {
    return {
      usersTable: []
    };
  },
  async created() {
    this.usersTable = (await this.$jraph`
    query{
        users: getUsers{
            userid,
            name,
            scope,
            containers,
        }
      }
    `).data.users;
  }
};
</script>

<style>
  [class ^= cell ] {
    font-family: "Roboto";
    font-weight: 500;
    color: #000;
  }
  [class ^= el-table__header-wrapper]{
    width: 100%;
  }
</style>