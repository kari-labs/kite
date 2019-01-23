<template>
  <el-menu
    default-active="1"
    class="el-aside"
    @open="handleOpen"
    @close="handleClose"
    :collapse="toggle"
  >
    <el-menu-item index="1" v-to="'containers'">
      <fa-icon icon="cube" size="lg" class="mr-1"/>
      <span slot="title">Containers</span>
    </el-menu-item>
    <el-menu-item index="2" v-to="'editor'" disabled aria-disabled="true">
      <fa-icon icon="file" size="lg" class="mr-1"/>
      <span slot="title">Editor</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <fa-icon icon="cog" size="lg" class="mr-1"/>
        <span slot="title">Settings</span>
      </template>
      <el-menu-item-group>
        <span slot="title">Settings</span>
        <el-menu-item index="1-1">Dark Theme
          <el-switch v-model="dark" class="ml-4"></el-switch>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="4">
      <fa-icon icon="sign-out-alt" size="lg" class="mr-1"/>
      <span slot="title">Logout</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "k-nav",
  props: ["toggle"],
  data() {
    return {
      dark: false
    };
  },
  methods: {
    handleOpen(event) {
      //Code for nav opening
    },
    handleClose(event) {
      //code for nav closing
    }
  },
  directives: {
    to: {
      inserted: (el, bin, vnode) =>{
        el.tabindex="1";
        el.addEventListener("click", (event)=>{
          try{
            this.$router.push(bin.value);
          }catch(error){
            console.group("v-to");
            console.log(error);
            console.groupEnd("v-to");
          }
        });
      }
    }
  }
};
</script>

<style>
.el-aside {
}
</style>
