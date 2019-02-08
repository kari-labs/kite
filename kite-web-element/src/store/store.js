import Vue from "vue";
import Vuex from "vuex";

// Module Imports
import { userModule } from "@/store/modules/user/user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule
  },
  state: {
    user: {
      _id: "5c50ef4aac536d001061bb77",
      userid: "001416358",
    },
  },
  mutations: {},
  actions: {},
});
