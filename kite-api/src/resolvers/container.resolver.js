const { createContainer, deleteContainer, getContainer, getContainers } = require('../utils/container.util');
const User = require("../models/user.model");
const { ObjectId } = require('mongoose').Types;
const ContainerResolvers = {
  createContainer: async ({ nickname }, req) => {
    let c;
    try {
      let store = req.session.userStore;
      if(store) {
        c = await createContainer({ owner: store._id, userid: store.userid, nickname });
        let u = await User.findByIdAndUpdate({_id: ObjectId(store._id)}, { $push: { "containers": c._id.toString() } }, { new: true });
        console.dir(u);
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
      let store = req.session.userStore;
      if(store) c = await getContainer(container_id);
      else throw new Error("User not logged in");
      return c;
    } catch (err) {
      throw err;
    }
  },
  getContainers: async (_, req) => {
    let c;
    try {
      let store = req.session.userStore;
      if(store) c = await getContainers(store._id);
      else throw new Error("User not logged in");
      return c;
    } catch (err) {
      throw err;
    }
  },
  deleteContainer: async ({ _id }, req) => {
    try {
      let store = req.session.userStore;
      if(store) {
        await deleteContainer(_id);
      }
      else throw new Error("User not logged in");
      return `Successfully deleted container ${_id}`;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};

module.exports = { ContainerResolvers };