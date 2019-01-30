<template>
  <el-card>
    <el-form>
      <el-form-item label="User ID">
        <el-input />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          type="password"
          v-model="rulePass.pass"
          autocomplete="off"
        />
        <el-form-item />
        <el-form-item
          label="Confirm"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="rulePass.checkPass"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('rulePass')"
          >
            Submit
          </el-button>
          <el-button @click="resetForm('rulePass')">
            Reset
          </el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "KACreate",
  data() {
      const validatorPass = (rule, value, callBack) => {
          if (value === ''){
              callBack(new Error('Please input the password'));
          } else {
              callBack();
          }
      };
      const validatorPassTwo = (rule, value, callBack) => {
          if (value === ''){
              callBack(new Error('Please input the password'));
          } else if (value !== this.rulePass.pass) {
              callBack(new Error('The passwords don\'t match!'));
          } else {
              callBack();
          }
      };
      return {
          rulePass: {
              pass: '',
              checkPass: ''
          },
          secRule: {
              pass: [
                  { validator: validatorPass, trigger: 'blur' }
              ],
              checkPass: [
                  { validator: validatorPassTwo, trigger: 'blur' }
              ]
          }
      };
  },
  methods: {
      submitForm(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  alert('submit!');
              } else {
                  console.log();
              }
          })
      }
  }
  /*
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
  */
}
</script>

<style>

</style>