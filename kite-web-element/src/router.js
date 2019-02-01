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
      meta: { 
        hideHeader: true,
        requiresAuth: false,
      }
    },
    {
      path: "/containers",
      name: "containers",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Containers,
      meta: { 
        hideHeader: false,
        requiresAuth: true,
      }
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Help,
      meta: { 
        hideHeader: false,
        requiresAuth: true,
      }
    }
  ]
});

// Runs auth on all routes by default
// (to) - page the user is requesting to go to
// (from) - page the user is coming from
// (next) - lets user proceed to page
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const data = getUserScope();
    data.then(scope => {
      // This currently just checks if the user has any scope.
      // At some point we should check if the user has the required scope to visit the requested page.
      // Ex. - User with scope of ["adminpanel", "containers"] requests to visit the "editor" page. They should be denied because they don't have the required scope.
      // The current system works like this - User with scope ["containers", "help"] requests page "adminpanel", he/she is allowed to go there because
      //     this function only checks if the user has any scope at all.
      if(scope.length > 0) {
        next();
      } else {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      }
    });
  } else {
    next();
  }
});

export default router;
