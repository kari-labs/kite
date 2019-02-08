import { loginUser } from '@/utils/auth.util';
import * as types from './user.types';

export const userModule = {
  // For some reason, I have been unable to spread into the state object, instead having to specify a property to assign a value to.
  // We should find a fix for this, as this current implementation sucks.
  // Currently can access this data by using this.$store.state.user.{property}
  state: {
    userid: '',
    name: '',
    containers: [],
    preferences: {
      theme: '',
    },
    scope: []
  },
  mutations: {
    [types.STORE_USER] (state, { user }) {
      state.userid = user.userid;
      state.name = user.name;
      state.containers = user.containers;
      state.preferences.theme = user.preferences.theme;
      state.scope = user.scope;
    },
    [types.REMOVE_USER] (state) {
      state.userid = '';
      state.name = '';
      state.containers = [];
      state.preferences.theme = '';
      state.scope = [];
    }
  },
  actions: {
    [types.LOGIN_USER] ({ commit }, { userid, pass, component }) {
      const response = loginUser(userid, pass)
      
      response.then(({ user }) => {
        if(user.scope) {
          commit({
            type: types.STORE_USER,
            user: user
          });
          if(component.$route.query.redirect) component.$router.push(component.$route.query.redirect);
          else component.$router.push('/containers');
        } else {
          alert('Incorrect User ID or Password');
        }
      });
    }
  }
};