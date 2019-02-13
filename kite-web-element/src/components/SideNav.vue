<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="toggle"
  >
    <k-nav-item
      to="containers"
      index="1"
      title="Containers"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="cube" />
      </i>
    </k-nav-item>
    <k-nav-item
      to="files"
      index="2"
      title="File Manager"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="file" />
      </i>
    </k-nav-item>
    <k-nav-item
      to="help"
      index="3"
      title="Help"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="question" />
      </i>
    </k-nav-item>
    <k-nav-item
      to="admin"
      index="4"
      title="Admin"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="user-shield" />
      </i>
    </k-nav-item>
    <k-nav-item
      to="/"
      index="5"
      title="Sign Out"
    >
      <i
        class="el-icon rotate-180"
        slot="icon"
      >
        <fa-icon icon="sign-out-alt" />
      </i>
    </k-nav-item>
  </el-menu>
</template>

<script>
import KNavItem from "@/components/NavItem.vue";

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
  },
  components: {
    KNavItem
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
</style>
