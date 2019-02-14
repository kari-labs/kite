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
        <fa-icon
            icon="bars"
          />
      </i>
      <span slot="title" v-else>
        KITE
      </span>
    </el-menu-item>
    <el-menu-item
      index="2"
      v-to="'containers'"
    >
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
    <el-menu-item
      index="4"
      v-to="'help'"
    >
      <i class="el-icon">
        <fa-icon icon="question" />
      </i>
      <span slot="title">
        Help
      </span>
    </el-menu-item>
    <el-menu-item
      index="5"
      v-to="'admin'"
    >
      <i class="el-icon">
        <fa-icon icon="user-shield" />
      </i>
      <span slot="title">
        Admin
      </span>
    </el-menu-item>
    <el-menu-item
      index="6"
      @click="signOutUser"
    >
      <i class="el-icon rotate-180">
        <fa-icon icon="sign-out-alt" />
      </i>
      <span slot="title">
        Sign Out
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { SIGN_OUT_USER } from '@/store/modules/auth/auth.types';

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
