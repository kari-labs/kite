<template>
  <el-container>
    <el-main>
      <el-card>
        <el-form :model="signInForm" :rules="signInRules" ref="signInForm">
          <el-form-item label="User ID" prop="userID"> 
            
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      userID: "",
      userPW: ""
    };
  }
};
</script>

<style></style>
