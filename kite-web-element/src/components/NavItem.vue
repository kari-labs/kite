<template>
  <router-link :to="to">
    <el-menu-item 
      :index="index" 
      @click="clicked"
    >
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
    props: 
    {
      to: { 
        type: String,
        default: "/"
      },
      index: {
        type: String,
        default: "1"
      },
      title: {
        type: String,
        default: "Title"
      },
    },
    methods: {
      clicked() {
        this.$emit('clicked');
      }
    }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>