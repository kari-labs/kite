import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Containers from "@/views/Containers.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { hideHeader: true }
    },
    {
      path: "/containers",
      name: "containers",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Containers,
      meta: { hideHeader: false }
    }
  ]
});
