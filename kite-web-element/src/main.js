import Vue from "vue";
import VueTour from 'vue-tour'
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/store";
import apolloProvider from "./apollo";
import "./plugins/element";
import "./plugins/font-awesome";
import Jraph from "./plugins/jraph";
import FileManager from './plugins/kite/filemanager'

import "./assets/helper.css";
import "normalize.css";
import 'vue-tour/dist/vue-tour.css';


Vue.use(Jraph, {api: "https://localhost/api/graphql"});
Vue.use(require('vue-shortkey'));
Vue.use(FileManager, {
  api_url: 'https://localhost/'
});
Vue.use(VueTour);

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  fileManager: new FileManager(),
  render: h => h(App)
}).$mount("#app");
