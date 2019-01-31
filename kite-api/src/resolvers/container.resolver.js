const { createContainer, stopContainer, getContainer, getContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ owner, userid, nickname }) => {
      try {
          await createContainer({owner, userid, nickname});
          return `Successfully created container for student ${userid}`;
      } catch (err) {
          return `Error creating container for student - ${err}`;
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
  getContainers: async ({userid}) => {
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