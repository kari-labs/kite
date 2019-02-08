import { loginUser } from '@/utils/auth.util';
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
    [types.LOGIN_USER] ({ commit }, { userid, pass, component }) {
      const response = loginUser(userid, pass)
      
      response.then(result => {
        if(result.data.user !== null) {
          commit({
            type: types.STORE_USER,
            user: result.data.user
          });
          if(component.$route.query.redirect) component.$router.push(component.$route.query.redirect);
          // We give the users the choice to chose a homepage and send them there by default
          else component.$router.push('/containers');
        } else {
          if(result.errors) {
            result.errors.map(err => {
              component.$message.error(err.message);
            });
          }
        }
      });
    }
  }
};
