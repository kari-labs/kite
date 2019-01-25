<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>Card name</span>
      <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'List item ' + o }}
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
</style>
