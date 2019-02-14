import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/store";
import "./plugins/element";
import "./plugins/font-awesome";
import Jraph from "./plugins/jraph";
import "./assets/helper.css";
import "normalize.css";
import apolloProvider from "./apollo";

Vue.use(Jraph, {api: "https://localhost/api/graphql"});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
