<template>
  <el-card class="card">
    <el-form
      ref="userForm"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="User ID">
        <el-input v-model="form.userid" />
      </el-form-item>
      <el-form-item label="Name">
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
      <el-form-item>
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
          label: "Super Admin"
        }
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$jraph`
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
                `;
        } else {
          console.log();
        }
      });
    }
  }
};
</script>

<style>
</style>