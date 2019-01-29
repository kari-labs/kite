<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="toggle"
  >
    <router-link to="containers">
      <el-menu-item index="1">
        <i class="el-icon">
          <fa-icon icon="cube" />
        </i>
        <span slot="title">
          Containers
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="files">
      <el-menu-item index="3">
        <i class="el-icon">
          <fa-icon icon="file" />
        </i>
        <span slot="title">
          File Manager
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="help">
      <el-menu-item index="4">
        <i class="el-icon">
          <fa-icon icon="question" />
        </i>
        <span slot="title">
          Help
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/">
      <el-menu-item index="5">
        <i class="el-icon rotate-180">
          <fa-icon icon="sign-out-alt" />
        </i>
        <span slot="title">
          Sign Out
        </span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {
  name: "KNav",
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dark: false
    };
  },
  methods: {
    handleOpen() {
      //Code for nav opening
    },
    handleClose() {
      //code for nav closing
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-icon {
  margin-right: 5px;
  vertical-align: baseline;
  width: 24px;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: inline-block;
}
.rotate-180{
  transform: rotate(180deg);
}
a {
  text-decoration: none;
}
</style>
