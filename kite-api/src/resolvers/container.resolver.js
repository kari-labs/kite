const { createContainer, stopContainer, getContainer, getContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ owner, userid, nickname }) => {
      try {
          const c = await createContainer({owner, userid, nickname});
          return c;
      } catch (err) {
          throw new Error("There was an error creating that container: ", err);
      }
  },
  getContainer: async ({container_id}) => {
      try {
          let container = await getContainer(container_id);
          return container;
      } catch (err) {
          return `Error retrieving your container - ${err}`;
      }
  },
  getContainers: async () => {
      try {
          let containers = await getContainers();
          return containers;
      } catch (err) {
          return `Error retriving the containers - ${err}`;
      }
  },
  deleteContainer: async ({userid}) => {
    try {
      await stopContainer(`${userid}php`);
      return `Successfully deleted container for student ${userid}`;
    } catch (err) {
      return `Error deleting container for student - ${err}`;
    }
  }
};

module.exports = { ContainerResolvers };