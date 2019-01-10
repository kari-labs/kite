const { getFileInfoHandler, getDirContents, getFileSizeInBytes, getDirSizeInBytesHandler, processUpload } = require('../utils/filestorage.util');
const { GraphQLUpload } = require('graphql-upload');

const FilesystemResolvers = {
  getFileInfo: async ({userid, path}) => getFileInfoHandler(userid, path),
  getDirContents: async ({userid, path}) => {
    return await getDirContents(userid, path);
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
    const { resolve, reject } = await promisesAll.all(
      files.map(file => processUpload(userid, file))
    )

    if (reject.length)
      reject.forEach(({ name, message }) =>
        // eslint-disable-next-line no-console
        console.error(`${name}: ${message}`)
      )

    return resolve
  }
}

module.exports = { FilesystemResolvers };