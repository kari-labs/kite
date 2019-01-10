const filesystemType = `
    scalar Upload

    type File {
      name: String,
      size: String,
      isdirectory: Boolean,
      modified: String,
      created: String
    }

    type Directory {
      files: [File]
    }
`;

module.exports = { filesystemType };