import Vue from "vue";
// To add UI components, import here first.
import { Button, Input, Card, Form, FormItem } from "element-ui";
import App from "./App.vue";

Vue.config.productionTip = false;

// Then tell Vue to use that component
Vue.use(Button);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);

new Vue({
  render: h => h(App)
}).$mount("#app");
