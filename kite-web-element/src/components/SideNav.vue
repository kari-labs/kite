<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="toggle"
  >
    <el-menu-item index="1">
      <i class="el-icon">
        <fa-icon icon="cube" />
      </i>
      <span slot="title">
        Containers
      </span>
    </el-menu-item>
    <el-menu-item
      index="3"
      disabled
    >
      <i class="el-icon">
        <fa-icon icon="file" />
      </i>
      <span slot="title">
        Editor
      </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon">
        <fa-icon icon="sign-out-alt" />
      </i>
      <span slot="title">
        Sign Out
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "KNav",
  props: {
    toggle: Boolean
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
  },
  directives: {
    to: {
      inserted: (el, bin, vnode) => {
        el.tabindex = "1";
        el.attributes[0].value = "button";
        const handleButton = () => {
          try {
            vnode.componentInstance.$router.push(bin.value);
          } catch (error) {
            // eslint-disable-next-line
            console.group("v-to");
            // eslint-disable-next-line
            console.log(error);
            // eslint-disable-next-line
            console.groupEnd("v-to");
          }
        };
        el.addEventListener("click", handleButton);
        el.addEventListener("keypress", handleButton);
      }
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
  width: 24px !important;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: inline-block;
}
</style>
