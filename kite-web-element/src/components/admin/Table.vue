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
      title="Update User"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        ref="userForm"
        :rules="rules"
      >
        <el-form-item
          label="User ID:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.userid"
            autocomplete="on"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="Name"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item 
          label="Password"
          prop="pass"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.pass"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Confirm"
          prop="checkPass"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.type"
            multiple
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false; $message({type: 'info', message: 'Update canceled'})">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="update()"
        >
          Confirm
        </el-button>
      </span>
    </el-dialog>
    <el-button
      type="text"
      @click="edit(/*scope.$index, usersTable*/)"
    >
      Edit
    </el-button>
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
          message: 'Delete Completed'
        });
        this.deleteUser(index, data);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Canceled'
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
    edit(/*index, data*/) {
      this.dialogFormVisible = true;
    },
    update() {//Called in edit.
      this.dialogFormVisible = false;
      this.$message({
          type: 'success',
          message: 'Update Completed'
      });
    },
  },
  data() {
    const validatorPass = (rule, value, callBack) => {
      if (value === "") {
        callBack(new Error("Please input the password"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.userForm.validateField("checkPass");
        }
        callBack();
      }
    };
    const validatorPassTwo = (rule, value, callBack) => {
      if (value === "") {
        callBack(new Error("Please input the password"));
      } else if (value !== this.form.pass) {
        callBack(new Error("The passwords don't match!"));
      } else {
        callBack();
      }
    };
    return {
      usersTable: [],
        dialogFormVisible: false,
        form: {
          name: 'Kyle Riley',
          userid: '001417108',
          type: [],
          pass: '',
          checkPass: '',
        },
        rules: {
        pass: [{ validator: validatorPass, trigger: "blur" }],
        checkPass: [{ validator: validatorPassTwo, trigger: "blur" }]
        },
        options: [
        {
          value: "containers",
          label: "Containers"
        },
        {
          value: "admin",
          label: "Admin"
        },
        {
          value: "createAdmin",
          label: "Super Admin"
        }],
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
    font-weight: 500;
    color: #000;
  }
  [class ^= el-table__header-wrapper]{
    width: 100%;
  }
  body {
    margin: 0;
  }
  .table {
    max-height: 50vh;
    min-width: 600px;
  }
</style>