<template>
  <el-form
    :model="authForm"
    :rules="authRules"
    ref="authForm"
  >
    <el-form-item
      label="User ID"
      prop="userid"
    >
      <el-input
        autofocus
        v-model="authForm.userid"
        placeholder="001233455"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item
      label="Password"
      prop="pass"
    >
      <el-input
        type="password"
        v-model="authForm.pass"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('authForm')"
      >
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { loginUser } from '../../utils/auth.util';

export default {
  data() {
    // User ID Validation
    const validateUserID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a User ID'));
      } else {
        callback();
      }
    };

    // User Password Validation
    const validateUserPW = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a password'));
      } else {
        callback();
      }
    };

    return {
      authForm: {
        userid: '',
        pass: '',
      },
      authRules: {
        userid: [
          { validator: validateUserID, trigger: 'blur' }
        ],
        pass: [
          { validator: validateUserPW, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // This function can be improved.
    // REFACTOR
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = loginUser(this.authForm.userid, this.authForm.pass)
          data.then(data => {
            // If scope is !== null then the user is valid and has scope
            data.user.scope !== null ? (
              // Check if the user was trying to access a certain page
              this.$route.query.redirect !== undefined ? (
                // If they were, route them there
                this.$router.push(this.$route.query.redirect)
              ) : (
                // If they weren't, push them to the containers page
                this.$router.push('/containers')
              )
            ) : (
              // If the User can't be logged in return an error message
              alert('Incorrect User ID or Password')
            )
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>