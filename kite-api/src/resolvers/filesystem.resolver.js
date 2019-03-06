const { getFileInfoHandler, getDirContents, getFileSizeInBytes, getDirSizeInBytesHandler, processUpload, renameFile } = require('../utils/filestorage.util');
const { GraphQLUpload } = require('graphql-upload');

const FilesystemResolvers = {
  Query: {
    getFileInfo: async (root, {userid, path}) => getFileInfoHandler(userid, path),
    getDirContents: async (root, {userid, path}) => {
      return await getDirContents(userid, path);
    },
    getFileSize: async (root, {path}) => {
      try {
        const size = await getFileSizeInBytes(path);
        return size;
      } catch (err) {
        return `${err}`;
      }
    },
    getDirSize: async (root, {path}) => {
      try {
        const size = await getDirSizeInBytesHandler(path)
        return `${size[0]}`;
      } catch (err) {
        return `${err}`;
      }
    },
  },
  Mutation: {
    renameFile: async (root, {userid, path, newPath}) => {
      return await renameFile(userid, path, newPath);
    },
    singleUpload: async (root, { userid, file }) => processUpload(userid, file),
    multipleUpload: async (root, {userid, files }) => {
      console.log(files);
      const result = await Promise.all(
        files.map(file => processUpload(userid, file))
      )
      console.log(result);
      return result
    },
  },
  Subscription: {},
  Upload: GraphQLUpload,
};

module.exports = { FilesystemResolvers };