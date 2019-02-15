<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    class="fullscreen"
  >
    <el-card class="login-card">
      <h1
        class="title"
      >
        Kite
      </h1>
      <auth-form />
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
.fullscreen {
  width: 100%;
  height: 90%;
}
.title {
  font-size: 20px;
  font-weight: 400;
}
</style>
