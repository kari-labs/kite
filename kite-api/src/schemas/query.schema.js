const queryType = `
    type Query {
        getContainer(container_id: String!): Container!
        getAllContainers: [Container!]!
        getFileInfo(userid: String!, path: String!): File!
        getDirContents(userid: String!, path: String!): Directory!
        getFileSize(path: String!): String!
        getDirSize(path: String!): String!
        loginUser(userid: String!, password: String!): User!
    }
`;

module.exports = { queryType };