<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    v-shortkey="{'open': ['shift','arrowright'], 'close': ['shift','arrowleft'], 'containers': ['ctrl','shift', 'c'], 'files': ['ctrl', 'shift', 'f']}" 
    @shortkey.native="handleHotKeys"
  >
    <el-menu-item
      index="1"
      @click="isCollapse = !isCollapse"
    >
      <i
        class="el-icon"
        v-if="isCollapse"
      >
        <fa-icon icon="bars" />
      </i>
      <span
        slot="title"
        v-else
      >
        KITE
      </span>
    </el-menu-item>
    <k-nav-item
      to="/containers"
      index="2-1"
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
      to="/containers/trash"
      index="2-2"
      title="Trash"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="trash" />
      </i>
    </k-nav-item>
    <k-nav-item
      to="/files"
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
      to="/help"
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
      to="/admin"
      index="5"
      title="Admin"
      v-if="$store.state.auth.user.scope.includes('admin')"
    >
      <i
        class="el-icon"
        slot="icon"
      >
        <fa-icon icon="user-shield" />
      </i>
    </k-nav-item>
    <el-menu-item
      index="6"
      @click="signOutUser"
    >
      <i
        class="el-icon rotate-180"
      >
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
    handleHotKeys(e) {
      console.log(e);
      switch(e.srcKey){
        case 'open':
          this.isCollapse = false;
          break;
        case 'close':
          this.isCollapse = true;
          break;
        case 'containers':
          this.$router.push("containers");
          break;
        case 'files':
          this.$router.push("files");
          break;
      }
    }
  },
  components: {
    KNavItem,
  },
  mounted() {
  },
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
