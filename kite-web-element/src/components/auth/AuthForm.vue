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
const _MinUserIDLength = 4;
const _MinUserPWLength = 4;
export default {
  data() {
    // User ID Validation
    const validateUserID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a User ID'));
      } else if (value.length < _MinUserIDLength) {
        callback(new Error(`Invalid ID - Minimum ID Length: ${_MinUserIDLength}`));
      } else {
        callback();
      }
    };

    // User Password Validation
    const validateUserPW = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a password'));
      } else if (value.length < _MinUserPWLength) {
        callback(new Error(`Invalid Password - Minimum Password Length: ${_MinUserPWLength}`));
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
          alert('Logged In!');
        } else {
          return false;
        }
      });
    }
  }
}
</script>