const { 
  loginUser, 
  createUser, 
  getUser, 
  getUsers, 
  deleteUser,
  signOutUser,
  updateUser,
} = require('../utils/user.util');

const UserResolvers = {
  Query: {
    getUser: async (root, args, req) => {
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
  },
  Mutation: {
    createUser: async (root, { ...userData }) => {
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
    deleteUser: async (root, { ...userData}) =>{
      try{
        return deleteUser(userData);
      } catch (err) {
        throw new Error (err);
      }
    },
    loginUser: async (root, { ...userData }, req) => {
      const userDB = await loginUser(userData, req);
      if(typeof userDB === "object") {
        return {
          ...userDB.toObject(),
          _id: userDB._id.toString()
        }
      }
      else throw new Error(userDB);
    },
    signOutUser: async(root, args, req) => {
      const status = await signOutUser(req);
      if(status) return 'Successfully signed out.';
      else return 'Error signing user out.'
    },
    updateUser: async(root, { userid: userIdToUpdate, user: userNewInfo }) => {
      const updatedUser = updateUser(userIdToUpdate, userNewInfo);
      return updatedUser;
    },
  },
  Subscription: {},
}

module.exports = { UserResolvers };