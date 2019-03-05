const User = require('../models/user.model');
const { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers, restoreContainer } = require('../utils/container.util');

const ContainerResolvers = {
  Query: {
    getContainer: async (root, { container_id }, { session: { userObjectID: requesterObjectID } }) => {
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
    getContainers: async (root, args, { session: { userObjectID: requesterObjectID } }) => {
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
  },
  Mutation: {
    createContainer: async (root, { nickname }, { session: { userObjectID: requesterObjectID } }) => {
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
    deleteContainer: async (root, { _id, permanently = false }, { session: { userObjectID: requesterObjectID } }) => {
      if(requesterObjectID !== undefined) {
        const requestingUser = await User.findById(requesterObjectID).exec();
  
        if(requestingUser.scope.includes("containers")) {
          await deleteContainer(_id, requesterObjectID, permanently);
  
          return `Successfully deleted container ${_id}`;
        } else {
          throw new Error("You do not have the required permissions to complete this action");
        }
      } else {
        throw new Error("You need to login to perform this action");
      }
    },
    deleteAllContainers: async (root, args, { session: { userObjectID: requesterObjectID } }) => {
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
    restoreContainer: async (root, { _id }, { session: { userObjectID: requesterObjectID } }) => {
      if(requesterObjectID !== undefined) {
        const requestingUser = await User.findById(requesterObjectID).exec();
  
        if(requestingUser.scope.includes("containers")) {
          await restoreContainer(_id);
          return true;
        } else {
          throw new Error("You do not have the required permissions to complete this action");
        }
      } else {
        throw new Error("You need to login to perform this action");
      }
    },
  },
  Subscription: {
    
  },
};

module.exports = { ContainerResolvers };