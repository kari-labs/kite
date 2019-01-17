import Vue from 'vue'
// To add UI components, import here first.
import { Button } from 'element-ui'
import App from './App.vue'

Vue.config.productionTip = false

// Then tell Vue to use that component
Vue.use(Button)

new Vue({
  render: h => h(App),
}).$mount('#app')
