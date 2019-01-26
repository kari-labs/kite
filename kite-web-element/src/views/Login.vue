<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-card class="login-card">
      <h1>Kite</h1>
      <AuthForm />
    </el-card>
  </el-row>
</template>

<script>
import AuthForm from '../components/auth/AuthForm.vue';

export default {
  components: {
    AuthForm
  }
};
</script>

<style>
.login-card {
  width: 500px;
}
</style>
