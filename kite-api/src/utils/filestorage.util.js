const fs = require('fs').promises;
const path = require('path');
const defaultPath = "/app/public/"

const getFileSizeInBytes = async userPath => {
  let absPath = path.join(defaultPath, userPath);
  try {
    const stats = await fs.stat(absPath);
    return stats['size'];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return `No file could be found at path: ${absPath}`;
    } else {
      return `${err}`;
    }
  }
};

const getDirSizeInBytes = dir => {
  let totalFileSize = 0;
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      // ------------------------------ Working Here
    });
  });
}

module.exports = { getFileSizeInBytes };