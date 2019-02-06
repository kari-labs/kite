const { loginUser, createUser, getUser } = require('../utils/user.util');

const UserResolvers = {
  createUser: async ({ ...userData }) => {
    try {
      const userDB = createUser(userData);
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString(),
      }
    } catch(err) {
      return `${err}`;
    }
  },
  loginUser: async ({ ...userData }, req) => {
    try {
      const userDB = await loginUser(userData, req);
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString()
      }
    } catch (err) {
      return `${err}`;
    }
  },
  getUser: async (_, req) => {
    try {
      const scope = await getUser(req);
      return scope;
    } catch (err) {
      return `${err}`;
    }
  }
}

module.exports = { UserResolvers };