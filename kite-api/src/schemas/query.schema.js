const queryType = `
    type Query {
        getContainer(userid: String!): Container!
        getAllContainers: [Container!]!
        getFileInfo(userid: String!, path: String!): File!
        getDirContents(userid: String!, path: String!): Directory!
        getFileSize(path: String!): String!
        getDirSize(path: String!): String!
    }
`;

module.exports = { queryType };