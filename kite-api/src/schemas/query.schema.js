const queryType = `
    type Query {
        getContainer(userid: String!): Container!
        getAllContainers: [Container!]!
        getFileSize(path: String!): String!
        getDirSize(path: String!): String!
    }
`;

module.exports = { queryType };