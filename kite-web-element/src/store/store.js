import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

// Module Imports
import { authModule } from "@/store/modules/auth/auth.module";
import { adminModule } from "@/store/modules/admin/admin.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    admin: adminModule
  },
  plugins: [
    createPersistedState({
      paths: ['auth.user']
    }),
  ]
});
