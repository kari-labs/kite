<template>
  <div class="tall">
    <el-header v-show="!$route.meta.hideHeader">
      <el-button
        type="text"
        @click="isCollapse = !isCollapse"
      >
        <i id="menuToggle">
          <fa-icon
            icon="bars"
            size="lg"
          />
        </i>
      </el-button>
      <span class="h1 display ml-1">
        <router-link
          to="/"
          class="el-link"
        >
          Kite
        </router-link>
      </span>
    </el-header>
    <el-container>
      <side-nav
        :toggle="isCollapse"
        v-if="!$route.meta.hideHeader"
      />
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <b class="title">
            Kite
          </b>
          <span class="subtitle">
            &copy; GLB Group 2019
          </span>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  name: "App",
  data() {
    return {
      isCollapse: true
    };
  },
  components: {
    SideNav
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
*{
  font-family:"Roboto", Arial, Helvetica, sans-serif;
}
.el-header{
  line-height: 60px;
  width: 100%;
}
.el-footer {
  background-color: #b3c0d1;
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
  flex-direction: column;
}
#menuToggle {
  vertical-align: baseline;
  width: 23px;
  display: inline-block;
}
</style>
