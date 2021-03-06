import { loginUser, signOutUser, updateUser, getCurrentUser } from '@/utils/auth.util';
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
    async [types.LOGIN_USER] ({ commit }, { userid, pass, redirect }) {
      const result = await loginUser(userid, pass);
      
      if(result.data.user !== null) {
        commit({
          type: types.STORE_USER,
          user: result.data.user
        });
        localStorage.setItem('expiry', new Date(Date.now() + (3 * 60 * 60 * 1000)).toUTCString());
        if(redirect) router.push(redirect);
        // We should give the users the ability to chose a homepage and send them there by default
        else if (result.data.user.forceReset) router.push("/updatepassword");
        else router.push("/containers");
      } else {
        if(result.errors) {
          result.errors.map(err => {
            Message.error(err.message);
          });
        }
      }
    },
    async [types.SIGN_OUT_USER] ({ commit }) {
      try {
        const result = await signOutUser();
        if(result) {
          commit(types.REMOVE_USER);
          localStorage.removeItem('expiry');
          router.push('/');
        } else {
          if(result.errors) {
            result.errors.map(err => {
              Message.error(err.message);
            });
          }
        }
      } catch (error) {
        console.error('Logged Error:', error);
      }
    },
    async [types.UPDATE_USER] ({ commit }, { userid, newUser }) {
      try {
        const result = await updateUser(userid, newUser);
        commit({
          type: types.STORE_USER,
          user: result.data.user
        });
        router.push('/containers');
      } catch (error) {
        console.error('Logged Error:', error);
      }
    },
    async [types.GET_CURRENT_USER] ({ commit }, { to }) {
      try {
        const result = await getCurrentUser();
        if(result.data) {
          commit({
            type: types.STORE_USER,
            user: result.data.user
          });
        }
      } catch (error) {
        if(to.path !== '/') console.error(error);
      }
    }
  }
};
