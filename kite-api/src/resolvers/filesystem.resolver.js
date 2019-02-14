const { getFileInfoHandler, getDirContents, getFileSizeInBytes, getDirSizeInBytesHandler, processUpload, renameFile } = require('../utils/filestorage.util');
const { GraphQLUpload } = require('graphql-upload');

const FilesystemResolvers = {
  getFileInfo: async ({userid, path}) => getFileInfoHandler(userid, path),
  getDirContents: async ({userid, path}) => {
    return await getDirContents(userid, path);
  },
  renameFile: async ({userid, path, newPath}) => {
    return await renameFile(userid, path, newPath);
  },
  getFileSize: async ({path}) => {
    try {
      const size = await getFileSizeInBytes(path);
      return size;
    } catch (err) {
      return `${err}`;
    }
  },
  getDirSize: async ({path}) => {
    try {
      const size = await getDirSizeInBytesHandler(path)
      return `${size[0]}`;
    } catch (err) {
      return `${err}`;
    }
  },
  Upload: GraphQLUpload,
  singleUpload: async ({ userid, file }) => processUpload(userid, file),
  multipleUpload: async ({userid, files }) => {
    console.log(files);
    const result = await Promise.all(
      files.map(file => processUpload(userid, file))
    )
    console.log(result);
    return result
  }
}

module.exports = { FilesystemResolvers };