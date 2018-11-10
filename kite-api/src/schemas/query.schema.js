const queryType = `
    type Query {
        getContainer(userid: String!): Container!
        getAllContainers: [Container!]!
        getFileSize(path: String!): String!
        hello: String
    }
`;

module.exports = { queryType };