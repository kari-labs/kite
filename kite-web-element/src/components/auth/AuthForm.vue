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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = loginUser(this.authForm.userid, this.authForm.pass)
          data.then(data => {
            if(data.user.scope !== null) {
              this.$router.push('/containers');
            } else {
              alert('Incorrect user id or password.');
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>