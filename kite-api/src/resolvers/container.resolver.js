const { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers, clearFalseContainersFromUser } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ nickname }, req) => {
    let c;
    try {
      let user = req.session.userStore;
      if(user) {
        c = await createContainer({ owner: user._id, userid: user.userid, nickname });
      }
      else throw new Error("User not logged in");
      return c;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  getContainer: async ({ container_id }, req) => {
    let c;
    try {
      let user = req.session.userStore;
      if(user) c = await getContainer(container_id);
      else throw new Error("User not logged in");
      return c;
    } catch (err) {
      throw err;
    }
  },
  getContainers: async (_, req) => {
    let c;
    try {
      let user = req.session.userStore;
      if(user) c = await getContainers(user._id);
      else throw new Error("User not logged in");
      return c;
    } catch (err) {
      throw err;
    }
  },
  deleteContainer: async ({ _id }, req) => {
    try {
      let user = req.session.userStore;
      if(user) {
        await deleteContainer(_id);
      }
      else throw new Error("User not logged in");
      return `Successfully deleted container ${_id}`;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  deleteAllContainers: async (_, req) => {
    try {
      let user = req.session.userStore;
      if(user) {
        let containers = await deleteAllContainers(user._id);
        return containers;
      }
      else throw new Error("User not logged in");
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  clearFalseContainers: async (_, req) => {
    try {
      let user = req.session.userStore;
      if(user) {
        await clearFalseContainersFromUser(user._id);
      }
      else throw new Error("User not logged in");
      return true;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};

module.exports = { ContainerResolvers };