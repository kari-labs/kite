<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    class="fullscreen"
  >
    <el-card class="update-card">
      <h1
        class="title"
      >
        Create a New Password
      </h1>
      <update-pass-form />
    </el-card>
  </el-row>
</template>

<script>
import UpdatePassForm from '@/components/auth/UpdatePassForm.vue';

export default {
  components: {
    UpdatePassForm
  }
};
</script>

<style>
.update-card {
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
