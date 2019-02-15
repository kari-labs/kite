<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item
      index="1"
      @click="isCollapse = !isCollapse"
    >
      <i class="el-icon" v-if="isCollapse">
        <fa-icon icon="bars" />
      </i>
      <span slot="title" v-else>
        KITE
      </span>
    </el-menu-item>
    <k-nav-item
      to="containers"
      index="2"
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
      index="3"
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
      index="4"
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
      index="5"
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
      index="6"
      @click="signOutUser"
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
import { SIGN_OUT_USER } from '@/store/modules/auth/auth.types';
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
      dark: false,
      isCollapse: true,
    };
  },
  methods: {
    signOutUser() {
      this.$store.dispatch(SIGN_OUT_USER);
    },
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
