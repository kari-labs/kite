const { createContainer, stopContainer, getContainer, getContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ nickname }, req) => {
    try {
      let store = req.session.userStore;
      const c = await createContainer({ owner: store._id, userid: store.userid, nickname });
      return c;
    } catch (err) {
      throw new Error("There was an error creating that container: " + err);
    }
  },
  getContainer: async ({ container_id }, req) => {
    try {
      let store = req.session.userStore;
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
  deleteContainer: async ({ userid }) => {
    try {
      await stopContainer(`${userid}php`);
      return `Successfully deleted container for student ${userid}`;
    } catch (err) {
      return `Error deleting container for student - ${err}`;
    }
  }
};

module.exports = { ContainerResolvers };