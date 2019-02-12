import { loginUser, signOutUser } from '@/utils/auth.util';
import router from '@/router.js';
import * as types from './auth.types';
import { Message } from 'element-ui';

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
      
      response.then(result => {
        if(result.data.user !== null) {
          commit({
            type: types.STORE_USER,
            user: result.data.user
          });
          if(redirect) router.push(redirect);
          // We give the users the choice to chose a homepage and send them there by default
          else router.push('/containers');
        } else {
          if(result.errors) {
            result.errors.map(err => {
              Message.error(err.message);
            });
          }
        }
      });
    },
    [types.SIGN_OUT_USER] ({ commit }) {
      const response = signOutUser();

      response.then(result => {
        if(result.data.stats !== null) {
          if(result.data.status === 'Successfully signed out.') {
            commit(types.REMOVE_USER);
            router.push('/');
          } else {
            Message.error(result.data.status);
          }
        } else {
          if(result.errors) {
            result.errors.map(err => {
              Message.error(err.message);
            });
          }
        }
      });
    }
  }
};
