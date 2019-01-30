const { createContainer, stopContainer, getContainer, getAllContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ owner, userid, nickname }, state) => {
      //Still trying to figure this out
      console.log("ARGS", {...(state.res.req.sessionStore)});
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
  }
};

module.exports = { ContainerResolvers };