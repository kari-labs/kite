import { loginUser } from '@/utils/auth.util';
import router from "@/router.js";
import * as types from './auth.types';

export const authModule = {
  state: {
    user: {}
  },
  mutations: {
    [types.STORE_USER] (state, { user }) {
      state.user = { ...user };
    },
    [types.REMOVE_USER] (state) {
      state.user = {};
    }
  },
  actions: {
    [types.LOGIN_USER] ({ commit }, { userid, pass, redirect }) {
      const response = loginUser(userid, pass);

      response.then(({ user }) => {
        if(user.scope) {
          commit({
            type: types.STORE_USER,
            user: user
          });
          if(redirect) router.push(redirect);
          else router.push('/containers');
        } else {
          alert('Incorrect User ID or Password');
        }
      });
    }
  }
};