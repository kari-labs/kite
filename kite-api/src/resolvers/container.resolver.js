const { createContainer, stopContainer, getContainer, getAllContainers } = require('../index.js');

const ContainerResolvers = {
  createContainer: async ({userid}) => {
      try {
          await createContainer(userid);
          return `Successfully created container for student ${userid}`;
      } catch (err) {
          return `Error creating container for student - ${err}`;
      }
  },
  getContainer: async ({userid}) => {
      try {
          let container = await getContainer(`${userid}php`);
          return container;
      } catch (err) {
          return `Error retrieving your container - ${err}`;
      }
  },
  getAllContainers: async () => {
      try {
          let containers = await getAllContainers();
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
  },
  hello: () => {
      return 'Hello World!';
  }
};

module.exports = { ContainerResolvers };