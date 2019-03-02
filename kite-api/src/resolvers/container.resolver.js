const User = require('../models/user.model');
const { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers } = require('../utils/container.util');

const ContainerResolvers = {
  createContainer: async ({ nickname }, { session: { userObjectID: requesterObjectID } }) => {
    if(requesterObjectID !== undefined) {
      const requestingUser = await User.findById(requesterObjectID).exec();

      if(requestingUser.scope.includes("containers")) {
        const container = await createContainer({ owner: requestingUser._id, userid: requestingUser.userid, nickname});

        return container;
      } else {
        throw new Error("You do not have the required permissions to complete this action");
      }
    } else {
      throw new Error("You need to login to perform this action");
    }
  },
  getContainer: async ({ container_id }, { session: { userObjectID: requesterObjectID } }) => {
    if(requesterObjectID !== undefined) {
      const requestingUser = await User.findById(requesterObjectID).exec();

      if(requestingUser.scope.includes("containers")) {
        const container = await getContainer(container_id);

        return container;
      } else {
        throw new Error("You do not have the required permissions to complete this action");
      }
    } else {
      throw new Error("You need to login to perform this action");
    }
  },
  getContainers: async (_, { session: { userObjectID: requesterObjectID } }) => {
    if(requesterObjectID !== undefined) {
      const requestingUser = await User.findById(requesterObjectID).exec();

      if(requestingUser.scope.includes("containers")) {
        const containers = await getContainers(requestingUser._id);

        return containers;
      } else {
        throw new Error("You do not have the required permissions to complete this action");
      }
    } else {
      throw new Error("You need to login to perform this action");
    }
  },
  deleteContainer: async ({ _id }, { session: { userObjectID: requesterObjectID } }) => {
    if(requesterObjectID !== undefined) {
      const requestingUser = await User.findById(requesterObjectID).exec();

      if(requestingUser.scope.includes("containers")) {
        await deleteContainer(_id);

        return `Successfully deleted container ${_id}`;
      } else {
        throw new Error("You do not have the required permissions to complete this action");
      }
    } else {
      throw new Error("You need to login to perform this action");
    }
  },
  deleteAllContainers: async (_, { session: { userObjectID: requesterObjectID } }) => {
    if(requesterObjectID !== undefined) {
      const requestingUser = await User.findById(requesterObjectID).exec();

      if(requestingUser.scope.includes("containers")) {
        const containers = await deleteAllContainers(requestingUser._id);

        return containers;
      } else {
        throw new Error("You do not have the required permissions to complete this action");
      }
    } else {
      throw new Error("You need to login to perform this action");
    }
  },
};

module.exports = { ContainerResolvers };