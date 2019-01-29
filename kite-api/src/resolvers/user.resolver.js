const { loginUser, createUser } = require('../utils/user.util');

const UserResolvers = {
  createUser: async ({ ...userData }) => {
    try {
      const user = createUser(userData);
      return {
        ...user,
        _id: user._id.toString(),
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
}

module.exports = { UserResolvers };