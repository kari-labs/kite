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
      />
      <el-table-column
        prop="name"
        label="Name"
      />
      <el-table-column
        prop="containers"
        label="Containers"
      />
      <el-table-column
        prop="scope"
        label="Scope"
      />
      <el-table-column
        label="Operations"
      >
        <!-- Operations -->
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="edit(scope.$index, usersTable)"
          >
            Edit
          </el-button>
          
          <el-button
            type="text"
            @click="warning(scope.$index, usersTable)"
          >
            Delete
          </el-button>
        </template>
        <!-- Operations Closed -->
      </el-table-column>
    </el-table>
    <el-dialog
      title="Shipping address"
      :visible.sync="dialogFormVisible"
    />
  </el-card>
</template>

<script>

export default {
  
  name: "KATable",
  methods: {
    dataManip(usersData) {
      return usersData.map(u => ({ ...u, containers: u.containers.length, scope: u.scope.join(", ")}) );
    },
    //Delete Button Function--------------------------------------------------------->
    warning(index, data) {
      this.$confirm('This will permanently delete this user. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type:'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
        this.deleteUser(index, data);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    deleteUser(index, data) {//Called in warning.
      data[index].userid
      this.$jraph`
        mutation{
          deleteUser(userid: "${data[index].userid}"){
            userid
            }
          }`
    },
    //Edit Button Function--------------------------------------------------------->
    edit(index, data) {
      this.dialogFormVisible = true;
      console.log(index);
      console.log(data);
    },
    update() {//Called in edit.

    },
  },
  data() {
    return {
      usersTable: [],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  async created() {//Table data fill
    this.usersData = (await this.$jraph`
    query{
        users: getUsers{
            userid,
            name,
            scope,
            containers,
        }
      }
    `).data.users;
    this.usersTable = this.dataManip(this.usersData);
    this.loading = false;
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
  body {
    margin: 0;
  }
</style>