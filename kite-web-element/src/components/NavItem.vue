<template>
  <router-link :to="to">
    <el-menu-item :index="index">
      <slot name="icon" />
      <span slot="title">
        {{ title }}
      </span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
    name: 'KNavItem',
    props: ['to', 'index', 'title']
}
</script>

<style>
a {
  text-decoration: none;
}
</style>