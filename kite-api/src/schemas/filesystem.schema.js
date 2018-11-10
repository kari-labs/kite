const filesystemType = `
    type File {
      Size: String
    }

    type Directory {
      Files: [File]
    }
`;

module.exports = { filesystemType };