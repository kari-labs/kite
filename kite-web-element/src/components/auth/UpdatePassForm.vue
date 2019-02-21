<template>
  <el-form
    :model="passForm"
    :rules="passRules"
    ref="updatePassForm"
  >
    <el-form-item
      label="New Password"
      prop="pass"
    >
      <el-input
        autofocus
        type="password"
        v-model="passForm.pass"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item
      label="Confirm Password"
      prop="passConfirm"
    >
      <el-input
        type="password"
        v-model="passForm.passConfirm"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('updatePassForm')"
      >
        Update Password
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const MIN_PASSWORD_LENGTH = 6;


export default {
  data() {
    // New Password Validation
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please create a new password'));
      } else if (value.length < MIN_PASSWORD_LENGTH) {
        callback(new Error('Minimum password length is 6 characters'));
      } else {
        callback();
      }
    };

    // Confirm Password Validation
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your new password'));
      } else if (value !== this.passForm.pass) {
        callback(new Error('Passwords don\'t match'));
      } else {
        callback();
      }
    };

    return {
      passForm: {
        pass: '',
        passConfirm: '',
      },
      passRules: {
        pass: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        passConfirm: [
          { validator: validateConfirmPass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('Yay')
        } else {
          return false;
        }
      });
    }
  }
}
</script>