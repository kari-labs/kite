import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

// Module Imports
import { authModule } from "@/store/modules/auth/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule
  },
  plugins: [
    createPersistedState(),
  ]
});
