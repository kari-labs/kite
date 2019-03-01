const queryType = `
    type Query {
        getContainer(container_id: String!): Container!
        getContainers: [Container!]!
        getFileInfo(userid: String!, path: String!): File!
        getDirContents(userid: String!, path: String!): Directory!
        getFileSize(path: String!): String!
        getDirSize(path: String!): String!
        getUsers:[User!]!
        getAnyUser(userid: String!): User!
        getCurrentUser: User!
    }
`;

module.exports = { queryType };