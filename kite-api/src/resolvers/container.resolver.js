const { createContainer, deleteContainer, getContainer, getContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ nickname }, req) => {
    try {
      let store = req.session.userStore;
      const c = await createContainer({ owner: store._id, userid: store.userid, nickname });
      return c;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  getContainer: async ({ container_id }) => {
    try {
      let container = await getContainer(container_id);
      return container;
    } catch (err) {
      return `Error retrieving your container - ${err}`;
    }
  },
  getContainers: async (_, req) => {
    try {
      let store = req.session.userStore;
      let containers = await getContainers(store._id);
      return containers;
    } catch (err) {
      return `Error retriving the containers - ${err}`;
    }
  },
  deleteContainer: async ({ _id }) => {
    try {
      await deleteContainer(_id);
      return `Successfully deleted container ${_id}`;
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = { ContainerResolvers };