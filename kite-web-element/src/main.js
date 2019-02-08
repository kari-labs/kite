import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import "./plugins/font-awesome";
import Jraph from "./plugins/jraph";
import "./assets/helper.css";
import "normalize.css";
import VueTour from 'vue-tour'

import 'vue-tour/dist/vue-tour.css';

Vue.use(VueTour)

Vue.use(Jraph, {api: "https://localhost/api/graphql"});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
