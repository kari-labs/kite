const { getFileInfo, getDirContents, getFileSizeInBytes, getDirSizeInBytesHandler } = require('../utils/filestorage.util');

const FilesystemResolvers = {
  getFileInfo: async ({userid, path}) => {
    return await getFileInfo(userid, path);
  },
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
  }
}

module.exports = { FilesystemResolvers };