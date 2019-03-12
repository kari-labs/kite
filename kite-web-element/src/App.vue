<template>
  <el-container class="tall">
    <side-nav v-if="!$route.meta.hideHeader" />
    <el-container>
      <el-header v-show="!$route.meta.hideHeader">
        <span class="h1 display">
            {{$route.name | capitalize}}
        </span>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  name: "App",
  components: {
    SideNav,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
*{
  font-family:"Roboto", Arial, Helvetica, sans-serif;
}
.el-header{
  line-height: 60px;
  width: 100%;
  border-bottom: 1px solid rgba(117, 117, 117, 0.3);
}
.el-footer {
  background-color: #d3dce6;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
  overflow-y: scroll;
}
body {
  margin: 0;
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
.el-link{
    color: #303133;
    text-decoration: none;
    transition: color 0.2s;
}
.el-link:active{
    color: #303133;
}
.el-link:visited{
    color: #303133;
}
.el-link:hover{
    color: #409EFF;
}
.tall {
  height: 100vh;
  width: 100%;
  display: flex;
}
#menuToggle {
  vertical-align: baseline;
  width: 23px;
  display: inline-block;
}
</style>
