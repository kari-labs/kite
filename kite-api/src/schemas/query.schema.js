const queryType = `
    type Query {
        getContainer(userid: String!): Container!
        getAllContainers: [Container!]!
        hello: String
    }
`;

module.exports = { queryType };