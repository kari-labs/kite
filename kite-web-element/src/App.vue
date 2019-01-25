<template>
  <!-- eslint-disable -->
  <el-container>
    <el-header>
      <el-button type="text" @click="isCollapse = !isCollapse">
        <fa-icon icon="bars" size="lg"></fa-icon>
      </el-button>
      <span class="h1 display ml-2">
        <router-link to="/" class="el-link">
          Kite
        </router-link>
      </span>
    </el-header>
    <el-container>
      <side-nav :toggle="isCollapse" class=""/>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  name: "App",
  data() {
    return {
      isCollapse: true,
      activeIndex: 0,
      dark: false
    };
  },
  components: {
    SideNav
  }
};
</script>

<style>
*{
  font-family:"Avenir", Arial, Helvetica, sans-serif;
}
.el-header{
  line-height: 60px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  width: 20vw;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
}
body > .el-container {
  height: 98vh;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.display{
  font-size: 1.5em;
}
</style>
