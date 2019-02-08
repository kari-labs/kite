const { 
  loginUser, 
  createUser, 
  getUser, 
  getUsers, 
  deleteUser,
} = require('../utils/user.util');

const UserResolvers = {
  createUser: async ({ ...userData }) => {
    try {
      const userDB = createUser(userData);
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString(),
      }
    } catch(err) {
      throw new Error(err);
    }
  },
  deleteUser: async ({ ...userData}) =>{
    try{
      return deleteUser(userData);
    } catch (err) {
      throw new Error (err);
    }
  },
  loginUser: async ({ ...userData }, req) => {
    const userDB = await loginUser(userData, req);
    if(typeof userDB === "object") {
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString()
      }
    }
    else throw new Error(userDB);
  },
  getUser: async (_, req) => {
    try {
      const scope = await getUser(req);
      return scope;
    } catch (err) {
      throw new Error(err);
    }
  },
  getUsers: async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (err) {
      throw new Error(err);
    }
  },
}

module.exports = { UserResolvers };