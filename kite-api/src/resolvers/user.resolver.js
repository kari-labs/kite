const { loginUser, createUser, getAllUsers, getUserScope } = require('../utils/user.util');

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
  getUserScope: async (_, req) => {
    try {
      const scope = await getUserScope(req);
      return scope;
    } catch (err) {
      return `${err}`;
    }
  },
  getUsers: async () => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (err) {
      return `${err}`;
    }
  }
}

module.exports = { UserResolvers };