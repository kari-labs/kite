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
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="dialogFormVisible = true"
          >
            Edit
          </el-button>
          <el-button
            type="text"
            @click="warning(scope.$index, usersTable)"
          >
            Delete
          </el-button>
          <!-- Beginning of edit form
          <el-dialog title="User Update" :visible.sync="dialogFormVisible">
            <el-form ref="userForm" :rules="rules" :model="form">
              <el-form-item label="User ID">
                <el-input v-model="form.userid" disabled/>
              </el-form-item>
              <el-form-item label="Name">
                <el-input v-model="form.name"/>
              </el-form-item>
              -
            </el-form>
          </el-dialog>
          -->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

export default {
  
  name: "KATable",
  methods: {
    deleteUser(index, data) {
      console.log(data[index].userid)
      this.$jraph`
        mutation{
          deleteUser(userid: "${data[index].userid}"){
            userid
            }
          }`
    },
    update() {

    },
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