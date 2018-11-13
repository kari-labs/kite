const fs = require('fs').promises;
const path = require('path');
const config = require('../../config/config');

const getFileInfo = async (userid, filepath) => {
  const file = path.join(config.userFolderPath, userid, filepath);
  const userDir = path.join(config.userFolderPath, userid);
  if(!file.startsWith(userDir)) {
    //res.status(403).json({error: 'Access denied'});
    throw new Error('Access denied');
  }
  try {
    const fileStats = await fs.stat(file)
    return {
      name: path.basename(file),
      created: fileStats.birthtime,
      isdirectory: fileStats.isDirectory(),
      modified: fileStats.mtime,
      size: fileStats.size
    }
  } catch(e) {
    if (e.code == 'ENOENT') {
      throw new Error('File not found');
      //res.status(404).json({error:'File not found'})
    } else {
      throw e;
    }
  }
}

const getDirContents = async (userid, filepath) => {
  const file = path.join(config.userFolderPath, userid, filepath);
  const userDir = path.join(config.userFolderPath, userid);
  if(!file.startsWith(userDir)) {
    //res.status(403).json({error: 'Access denied'});
    throw new Error('Access denied');
  }
  try {
    try {
      const files = await fs.readdir(file)
      return {
          files: await Promise.all(files.map(async filename => {
          const filepath = path.join(file, filename);
          const fileStats =  await fs.stat(filepath);
          return {
            name: filename,
            created: fileStats.birthtime,
            isdirectory: fileStats.isDirectory(),
            modified: fileStats.mtime,
            size: fileStats.size
          }
        }))
      }
    } catch(e) {
      throw new Error('File is not a directory');
    }
  } catch(e) {
    if (e.code == 'ENOENT') {
      throw new Error('File not found');
      //res.status(404).json({error:'File not found'})
    } else {
      throw e;
    }
  }
}

const getFileSizeInBytes = async userPath => {
  let absPath = path.join(config.userFolderPath, userPath);
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
  const dirPath = path.join(config.userFolderPath, userPath); 
  const size = await getDirSizeInBytes(dirPath, memo);
  return size;
}

module.exports = { getFileInfo, getDirContents, getFileSizeInBytes, getDirSizeInBytesHandler };