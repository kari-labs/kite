const { loginUser, createUser } = require('../utils/user.util');

const UserResolvers = {
  // This doesn't currently return anything - TODO
  createUser: async ({ ...userData }) => {
    try {
      createUser(userData);
    } catch(err) {
      return `${err}`;
    }
  },
  loginUser: async ({ ...userData }, req) => {
    try {
      const result = await loginUser(userData, req);
      return result;
    } catch (err) {
      return `${err}`;
    }
  },
}

module.exports = { UserResolvers };