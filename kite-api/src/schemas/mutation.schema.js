const mutationType = `
    type Mutation {
        createContainer(userid: String!): String
        deleteContainer(userid: String!): String
    }
`;

module.exports = { mutationType };