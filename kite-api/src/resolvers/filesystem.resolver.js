const { getFileSizeInBytes } = require('../utils/filestorage.util');

const FilesystemResolvers = {
  getFileSize: async ({path}) => {
    try {
      const size = await getFileSizeInBytes(path);
      return `The file size is ${size} bytes.`;
    } catch (err) {
      return `${err}`;
    }
  }
}

module.exports = { FilesystemResolvers };