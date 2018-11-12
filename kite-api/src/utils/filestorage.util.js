const fs = require('fs').promises;
const path = require('path');
const defaultPath = "/app/public/";

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

const getDirSizeInBytes = async (dirPath, memo) => {
  const fileStats = await fs.stat(dirPath);
  if(fileStats.isDirectory()) {
    const files = await fs.readdir(dirPath);
    for (let file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      if(stats.isDirectory()) {
        await getDirSizeInBytes(filePath, memo);
      } else {
        memo[0] += stats['size'];
      }
    }
  } else {
    memo[0] = `The provided path is not a directory - ${userDir}`;
  }
  return memo;
}

const getDirSizeInBytesHandler = async (userPath) => {
  const memo = [0];
  const dirPath = path.join(defaultPath, userPath); 
  const size = await getDirSizeInBytes(dirPath, memo);
  return size;
}

module.exports = { getFileSizeInBytes, getDirSizeInBytesHandler };