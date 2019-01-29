const { loginUser, createUser } = require('../utils/user.util');

const UserResolvers = {
  createUser: async ({ ...userData }) => {
    try {
      let user = createUser(userData);
      return user;
    } catch(err) {
      return `${err}`;
    }
  },
  loginUser: async ({ ...userData }, req) => {
    try {
      const user = await loginUser(userData, req);
      return user;
    } catch (err) {
      return `${err}`;
    }
  },
}

module.exports = { UserResolvers };