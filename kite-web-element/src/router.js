import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Containers from "@/views/Containers.vue";
import Help from "@/views/Help.vue";
import { getUserScope } from "@/utils/auth.util.js";

Vue.use(Router);



const router = new Router({
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
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Help,
      meta: { hideHeader: false }
    }
  ]
});

const openRoutes = [
  "login",
  "resetPassword",
  "contactAdmin",
];

// Runs auth on all routes by default
// (to) - page the user is requesting to go to
// (from) - page the user is coming from
// (next) - lets user proceed to page
router.beforeEach((to, from, next) => {
  if(openRoutes.includes(to.name)) {
    next()
  } else {
    const data = getUserScope();
    data.then(scope => {
      if(scope.length > 0) {
        next();
      } else {
        router.push('/');
      }
    });
  }
});

export default router;
