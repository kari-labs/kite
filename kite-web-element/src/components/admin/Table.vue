<template>
  <el-card class="box-card">
    <el-table
      ref="adminTable"
      :data="usersTable.filter(
        data => !search ||
          data.name.toLowerCase().includes(search.toLowerCase()) || 
          data.userid.toLowerCase().includes(search.toLowerCase())
      )"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        fixed
        prop="userid"
        label="User ID"
        sortable
      />
      <el-table-column
        prop="name"
        label="Name"
        sortable
      />
      <el-table-column
        prop="containers"
        label="Containers"
        sortable
      />
      <el-table-column
        prop="scope"
        label="Scope"
        :filters="scopeTags" 
        :filter-method="filterScope" 
        filter-placement="bottom-end"
        align="left"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="tag in scope.row.scope"
            :key="tag"
            :class="'tag-'+ tag"
          >
            {{ scopes[tag] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
      >
        <template
          slot="header"
          slot-scope="scope" 
        >
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"
          />
        </template>
        <!-- Operations -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="edit(scope.$index, usersTable, form, currentIndex)"
          >
            Edit
          </el-button>
          
          <el-button
            type="text"
            size="mini"
            @click="warning(scope.$index, usersTable)"
          >
            <div
              v-if="$store.state.auth.user.userid != usersTable[scope.$index].userid"
              style="float-left;"
            >
              Delete
            </div>
          </el-button>
        </template>
        <!-- Operations Closed -->
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="10"
      :pager-count="5"
      layout="prev, pager, next"
      :total="usersTable.length"
    />
    <!-- Edit Dialog -->
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
          @click="update(currentIndex, usersTable, form, updatedUser)"
        >
          Confirm
        </el-button>
      </span>
    </el-dialog>
    <!-- End of Edit Modal -->
  </el-card>
</template>

<script>
import { apolloClient } from '@/apollo.js';
import gql from 'graphql-tag';
import * as admin from "@/utils/admin.util.js";
export default {
  name: "KATable",
  methods: {
    dataManip(){admin.dataManip(usersData)},
    warning(){admin.warning(index, data)},
    deleteUser(){ admin.deleteUser(index, data)},
    edit() {admin.edit(index, data, form, currentIndex)},
    update() {admin.update(currentIndex, data, form, updatedUser)},
    toggleSelection() {admin.toggleSelection(rows)},
    handleSelectionChange() {admin.handleSelectionChange(val)},
    filterScope() {admin.filterScope(value, row)},
    filterHandler() {admin.filterHandler(value, row, column)},
    async fetchUsers() {
      this.usersData = (await apolloClient.query({
        query: gql  `
        query{
            users: getUsers{
                userid,
                name,
                scope,
                containers {
                  nickname
                },
            }
          }
        `
      })).data.users;
      this.usersTable = admin.dataManip(this.usersData);
      this.loading = false;
    }
    
  },
  data() {
    const validatorPass = (rule, value, callBack) => {
      if (value === "") {
        callBack(new Error("Please input the password"));
      } else if(value.length() < 6){
        callBack(new Error("Minimum password length is 6 characters"))
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
      } else if(value.length() < 6) {
        callBack(new Error("Minimum password length is 6 characters"))
      }else {
        callBack();
      }
    };
    return {
      currentIndex: '',
        updatedUser: {
          name: '',
          scope: [],
          password: ''
        },
        scopes: {
          "containers": "Containers",
          "createAdmin": "Create Admin",
          "admin": "Admin"
        },
        scopeTags: [
          { text: 'Containers', value: 'containers'},
          { text: 'Admin', value: 'admin'},
          { text: 'Create Admin', value: 'createAdmin'}
        ],
        multipleSelection: [],
        usersTable: [],
        dialogFormVisible: false,
        form: {
          name: '',
          userid: '',
          type: [],
          pass: '',
          checkPass: '',
        },
        rules: {
        pass: [{ validator: validatorPass, trigger: "blur" }],
        checkPass: [{ validator: validatorPassTwo, trigger: "blur" }]
        },
        search: '',
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
  async mounted() {
    await this.fetchUsers();
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
  .box-card {
    height: max-content;
    min-width: 600px;
    margin-left: 4%;
    margin-right: 4%;
  }
  .el-tag{
    margin: 2px 1px;
  }
  .el-tag.tag-admin{
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: rgba(103, 194, 58);
  }
  .el-tag.tag-createAdmin{
    background-color: rgba(255, 194, 58, 0.1);
    border-color: rgba(255, 194, 58, 0.2);
    color: rgba(255, 194, 58);
  }
</style>