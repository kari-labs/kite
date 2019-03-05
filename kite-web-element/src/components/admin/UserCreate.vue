<template>
  <el-card class="card">
    <el-form
      ref="userForm"
      :rules="rules"
      :model="form"
    >
      <el-form-item
        label="User ID"
        prop="userid"
      >
        <el-input v-model="form.userid" />
      </el-form-item>
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item 
        label="Password"
        prop="pass"
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
      >
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item 
        prop="scope"
        label="Scope"
      >
        <el-select
          v-model="form.scope"
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
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('userForm')"
        >
          Submit
        </el-button>
        <el-button @click="resetForm('userForm')">
          Reset
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import * as admin from "@/utils/admin.util.js";
import { apolloClient } from '@/apollo.js';
import gql from 'graphql-tag';
export default {
  name: "KACreate",
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
      form: {
        userid: "",
        name: "",
        scope: [],
        pass: "",
        checkPass: ""
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
          label: "Create Admin"
        }
      ],
    };
  },
  methods: {
    //Submits User info for creation
    submitForm(formName) {
      this.$emit('created:user', null);
    this.$refs[formName].validate(valid => {
      if (valid) {
        apolloClient.mutate({
          mutation: gql`
          mutation{
          createUser(
              userid: "${this.form.userid}", 
              name: "${this.form.name}", 
              password: "${this.form.pass}", 
              scope: ${JSON.stringify(this.form.scope)}
              ){
              userid,name,scope
              }
          }
      `})
        ;
        this.$message({
          type: 'success',
          message: 'User Created'
        });
      }
    });
      
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$message({
          type: 'info',
          message: 'Field Cleared'
        })
    }
  }
};
</script>

<style>
  .card{
    height: max-content;
    min-width: 20vw;
    margin-left: 2vw;
  }
  
  .el-select {
    width: 100%;
  }
</style>
