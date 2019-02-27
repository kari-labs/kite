const { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers, restoreContainer } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ nickname }, req) => {
    let containers;
    try {
      let user = req.session.userStore;
      if(user) {
        containers = await createContainer({ owner: user._id, userid: user.userid, nickname });
      }
      else throw new Error("User not logged in");
      return containers;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  getContainer: async ({ container_id }, req) => {
    let containers;
    try {
      const user = req.session.userStore;
      if(user) containers = await getContainer(container_id);
      else throw new Error("User not logged in");
      return containers;
    } catch (err) {
      throw err;
    }
  },
  getContainers: async (_, req) => {
    let containers;
    try {
      let user = req.session.userStore;
      if(user) containers = await getContainers(user._id);
      else throw new Error("User not logged in");
      return containers;
    } 
    catch (err) {
      throw err;
    }
  },
  deleteContainer: async ({ _id, permanently = false }, req) => {
    console.log(permanently);
    try {
      let user = req.session.userStore;
      if(user) {
        await deleteContainer(_id, user._id, permanently);
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
  restoreContainer: async ({_id}, req) => {
    if(req.session.userStore) {
      await restoreContainer(_id);
      return true;
    }else {
      throw new Error("User not logged in");
    }
  },
};

module.exports = { ContainerResolvers };